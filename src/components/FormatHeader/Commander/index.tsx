/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import useCommander from "@hooks/useCommander";
import ManaCost from "@components/ManaCost";
import SingletonCount from "../SingletonCount";
import CommanderModal from "./CommanderModal";

const SELECT_COMMANDER_TEXT = "Select Commander";

type ConvertIdentityToCost = (identity: string[]) => string;
const convertIdentityToCost: ConvertIdentityToCost = (identity) => {
  if (identity.length === 0) return "{C}";
  return `{${identity.join("}{")}}`;
};

// eslint-disable-next-line max-lines-per-function
const Commander: React.FC = () => {
  const [isCommanderModalOpen, setCommanderModalOpen] = useState(false);
  const closeCommanderModal = useCallback(() => setCommanderModalOpen(false), []);
  const openCommanderModal = useCallback(() => setCommanderModalOpen(true), []);
  const { colorIdentity, commander, partner } = useCommander();

  const identityAsCost = useMemo(() => convertIdentityToCost(colorIdentity), [
    colorIdentity,
  ]);

  return (
    <Container>
      <Title onClick={openCommanderModal}>
        <span>{commander.name || SELECT_COMMANDER_TEXT}</span>
        <span>{partner.name}</span>
      </Title>
      <SingletonCount />
      <Cost>
        <ManaCost cost={identityAsCost} />
      </Cost>
      {isCommanderModalOpen &&
        ReactDOM.createPortal(
          <CommanderModal closeModal={closeCommanderModal} />,
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

export default Commander;
