import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ManaCost from "@components/ManaCost";
import SingletonCount from "../SingletonCount";
import OathbreakerModal from "./OathbreakerModal";
import { useOathbreaker } from "@contexts/Oathbreaker";

const SELECT_OATHBREAKER_TEXT = "Select Oathbreaker";
const SELECT_SIGNATURE_TEXT = "Select Signature Spell";

type ConvertIdentityToCost = (identity: string[]) => string;
const convertIdentityToCost: ConvertIdentityToCost = (identity) => {
  if (identity.length === 0) return "{C}";
  return `{${identity.join("}{")}}`;
};

const Oathbreaker: React.FC = () => {
  const [isOathbreakerModalOpen, setOathbreakerModalOpen] = useState(false);
  const closeOathbreakerModal = useCallback(() => setOathbreakerModalOpen(false), []);
  const openOathbreakerModal = useCallback(() => setOathbreakerModalOpen(true), []);
  const { colorIdentity, oathbreaker, signatureSpell } = useOathbreaker();

  const identityAsCost = useMemo(
    () => convertIdentityToCost(colorIdentity),
    [colorIdentity],
  );

  return (
    <Container>
      <Title onClick={openOathbreakerModal}>
        <span>{oathbreaker.name || SELECT_OATHBREAKER_TEXT}</span>
        <span>{signatureSpell.name || SELECT_SIGNATURE_TEXT}</span>
      </Title>
      <SingletonCount />
      <Cost>
        <ManaCost cost={identityAsCost} />
      </Cost>
      {isOathbreakerModalOpen &&
        ReactDOM.createPortal(
          <OathbreakerModal closeModal={closeOathbreakerModal} />,
          document.querySelector("body"),
        )}
    </Container>
  );
};

const Container = styled.div`
  width: 40%;
  border-right: 1px solid ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  width: 250px;
  > * {
    height: 50%;
  }
`;
const Cost = styled.div`
  margin: 0 8px;
  width: 102px;
  display: flex;
  justify-content: center;
`;

export default Oathbreaker;
