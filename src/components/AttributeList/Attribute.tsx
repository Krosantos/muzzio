import React, { useMemo } from "react";
import styled from "styled-components";
import CardList from "@components/CardList";
import useSorting from "./useSorting";
import useInDeckString from "./useInDeckString";
import RemoveButton from "./RemoveButton";
import { Attribute as AttributeType } from "@contexts/Attributes";
import { useCards } from "@contexts/Card";

type AttributeProps = {
  attribute: AttributeType;
};

const Attribute: React.FC<AttributeProps> = ({ attribute }) => {
  const cardData = useCards((s) => s.cardData);

  const cardsToShow = useMemo(() => {
    const cardNames = Object.keys(attribute.cards);
    return cardNames.map((name) => cardData[name]).filter((c) => !!c);
  }, [attribute.cards, cardData]);
  const inDeckString = useInDeckString(attribute.name);
  const { openMenu, sortedCards } = useSorting(cardsToShow);

  return (
    <Container>
      <Title>
        <span onContextMenu={openMenu}>
          {attribute.name}
          {inDeckString}
        </span>
        <RemoveButton attribute={attribute.name} />
      </Title>
      <ListWrapper>
        <CardList cards={sortedCards} />
      </ListWrapper>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.smoke};
  border-radius: 4px;
  width: 250px;
  background-color: ${({ theme }) => theme.taupe};
  padding: 4px 0px 4px 4px;
  max-height: calc(100% - 10px);
  margin-bottom: 4px;
  margin-right: 4px;

  & ::-webkit-scrollbar {
    width: 10px;
  }

  & ::-webkit-scrollbar-button {
    display: none;
  }

  & ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.smoke};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.smoke};
  }
`;

const Title = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 1.05em;
  align-items: center;
  justify-content: space-between;
  span {
    display: block;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 2px;
  margin-right: 2px;
  max-height: calc(100vh - 106px);
`;

export default Attribute;
