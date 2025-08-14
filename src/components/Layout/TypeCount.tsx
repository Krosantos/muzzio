import React from "react";
import iconMap from "@components/TypeIcons";
import styled from "styled-components";
import { useCards } from "@contexts/Card";

interface Count {
  creature: number;
  instant: number;
  sorcery: number;
  artifact: number;
  enchantment: number;
  planeswalker: number;
  land: number;
}

const useTypeCounts = () => {
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const cardData = useCards((s) => s.cardData);
  const result: Count = {
    creature: 0,
    instant: 0,
    sorcery: 0,
    artifact: 0,
    enchantment: 0,
    planeswalker: 0,
    land: 0,
  };

  const types = Object.keys(result);
  const cardNames = Object.keys(cardsInDeck);

  for (let name of cardNames) {
    const card = cardData[name];
    const count = cardsInDeck[name] || 1;
    if (!card) continue;
    for (let cardType of types) {
      if (card.type.toLocaleLowerCase().includes(cardType)) result[cardType] += count;
    }
  }

  return result;
};

const TypeCount: React.FC = () => {
  const typeCounts = useTypeCounts();

  return (
    <Wrapper>
      {Object.keys(typeCounts).map((cardType: keyof Count) => (
        <CountCell cardType={cardType} count={typeCounts[cardType]} key={cardType} />
      ))}
    </Wrapper>
  );
};

interface CountCellProps {
  cardType: string;
  count: number;
}
const CountCell: React.FC<CountCellProps> = ({ count, cardType }) => {
  return (
    <div>
      <ImageHolder>
        <img alt={cardType} src={iconMap[cardType as keyof typeof iconMap]} />
      </ImageHolder>
      <p>:&nbsp;{count}</p>
    </div>
  );
};

const ImageHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 4px;
  width: 1.75rem;
  height: 2rem;
  img {
    display: block;
    max-width: 1.5rem;
    max-height: 1rem;
    width: auto;
    height: auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > div {
    margin-right: 8px;
    display: flex;
    align-items: center;
    font-size: 1rem;
    line-height: 1rem;
  }
`;

export default TypeCount;
