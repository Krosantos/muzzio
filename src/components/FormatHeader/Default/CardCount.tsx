import React, { useMemo } from "react";
import styled from "styled-components";
import useCards from "@hooks/useCards";

const MAIN_COUNT = "/60";
const SIDE_COUNT = "/15";

type CalculateCardCount = (cards: Card[]) => number;
const calculateCardCount: CalculateCardCount = (cards = []) => {
  let result = 0;

  cards.forEach((card) => {
    result += card.count || 1;
  });
  return result;
};

const calculateSideboardCount: CalculateCardCount = (cards = []) => {
  let result = 0;

  cards.forEach((card) => {
    result += card.sideboardCount || 1;
  });
  return result;
};

const CardCount: React.FC = () => {
  const { cardsInDeck, cardsInSideboard } = useCards();
  const mainCount = useMemo(() => calculateCardCount(cardsInDeck()), [cardsInDeck]);
  const sideCount = useMemo(() => calculateSideboardCount(cardsInSideboard()), [
    cardsInSideboard,
  ]);

  return (
    <Count>
      <span>
        {mainCount}
        {MAIN_COUNT}
      </span>
      <span>
        {sideCount}
        {SIDE_COUNT}
      </span>
    </Count>
  );
};
const Count = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & span {
    display: block;
  }
`;

export default CardCount;
