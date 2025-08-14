import { useCards } from "@contexts/Card";
import React from "react";
import styled from "styled-components";

const MAIN_COUNT = "/60";
const SIDE_COUNT = "/15";

const sumCardCount = (count: { [cardName: string]: number }): number => {
  let result = 0;

  for (let name of Object.keys(count)) {
    result += count[name];
  }
  return result;
};

const CardCount: React.FC = () => {
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const cardsInSideboard = useCards((s) => s.cardsInSideboard);
  const mainCount = sumCardCount(cardsInDeck);
  const sideCount = sumCardCount(cardsInSideboard);
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
