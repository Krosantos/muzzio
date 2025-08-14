import React, { useMemo } from "react";
import styled from "styled-components";
import capitalize from "lodash/capitalize";
import ManaCost from "@components/ManaCost";
import CardCount from "./CardCount";
import { useFormat } from "@contexts/Format";
import { useCards } from "@contexts/Card";

type ConvertIdentityToCost = (identity: string[]) => string;
const convertIdentityToCost: ConvertIdentityToCost = (identity) => {
  if (identity.length === 0) return "{C}";
  return `{${identity.join("}{")}}`;
};

type GetIdentityFromCards = (
  cardsInDeck: {
    [cardName: string]: number;
  },
  cardsInSideboard: { [cardName: string]: number },
  cardData: { [cardName: string]: Card },
) => string;
const getIdentityFromCards: GetIdentityFromCards = (
  cardsInDeck,
  cardsInSideboard,
  cardData,
) => {
  const identityMap: { [color: string]: boolean } = {};

  const deckNames = Object.keys(cardsInDeck);
  const boardNames = Object.keys(cardsInSideboard);
  for (let name of [...deckNames, ...boardNames]) {
    const card = cardData[name];
    if (!card) continue;

    for (let c of card.identity) identityMap[c] = true;
  }

  const identity = Object.keys(identityMap);

  return convertIdentityToCost(identity);
};

const DefaultFormat: React.FC = () => {
  const format = useFormat((s) => s.format);
  const formattedFormat = useMemo(() => capitalize(format), [format]);
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const cardsInSideboard = useCards((s) => s.cardsInSideboard);
  const cardData = useCards((s) => s.cardData);
  const deckIdentity = useMemo(
    () => getIdentityFromCards(cardsInDeck, cardsInSideboard, cardData),
    [],
  );

  return (
    <Container>
      <FormatName>{formattedFormat}</FormatName>
      <CardCount />
      <Cost>
        <ManaCost cost={deckIdentity} />
      </Cost>
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
const FormatName = styled.div`
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

export default DefaultFormat;
