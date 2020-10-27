import React, { useMemo } from "react";
import styled from "styled-components";
import useCards from "@hooks/useCards";

const LANDS = "Lands: ";

type GetLandCount = (cardsInDeck: () => Card[]) => number;
const getLandCount: GetLandCount = (cardsInDeck) => {
  const landsInDeck = cardsInDeck().filter(({ type }) => type.includes("Land"));

  let count = 0;

  landsInDeck.forEach((card) => {
    count += card.count || 1;
  });
  return count;
};

const LandCount: React.FC = () => {
  const { cardsInDeck } = useCards();
  const landCount = useMemo(() => getLandCount(cardsInDeck), [cardsInDeck]);

  return (
    <Wrapper>
      {LANDS}
      {landCount}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-right: 8px;
  display: flex;
  align-items: center;
`;

export default LandCount;
