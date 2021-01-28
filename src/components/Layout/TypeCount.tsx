import React from "react";
import iconMap from "@components/TypeIcons";
import useCards from "@hooks/useCards";
import styled from "styled-components";

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
  const { cardsInDeck } = useCards();
  const result: Count = {
    creature: 0,
    instant: 0,
    sorcery: 0,
    // eslint-disable-next-line sort-keys
    artifact: 0,
    enchantment: 0,
    planeswalker: 0,
    // eslint-disable-next-line sort-keys
    land: 0,
  };

  cardsInDeck().forEach((card) => {
    Object.keys(result).forEach((cardType: keyof Count) => {
      if (card.type.toLowerCase().includes(cardType)) result[cardType] += card.count || 1;
    });
  });

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
