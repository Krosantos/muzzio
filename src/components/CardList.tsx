import React, { useMemo } from 'react';
import values from 'lodash/values';
import Card from './Card';

type CardListProps = {
  alwaysColorful?:boolean,
  cards:Card[] | {[id:string]:Card},
  callback?: Function
  useMaindeckCount?: boolean
  useSideboardCount?:boolean
}

const CardList:React.FC<CardListProps> = ({
  alwaysColorful = false,
  cards = [],
  callback = Function.prototype,
  useMaindeckCount = false,
  useSideboardCount = false,
}) => {
  const cardArray = useMemo<Card[]>(() => {
    if (!Array.isArray(cards))
      return values(cards);
    return cards;
  }, [cards]);

  return (
    <>
      {
        cardArray.map((card) => (
          <Card
            alwaysColorful={alwaysColorful}
            callback={callback}
            cardId={card.id}
            key={card.id}
            rawCard={card}
            useMaindeckCount={useMaindeckCount}
            useSideboardCount={useSideboardCount}
          />
        ))
      }
    </>
  );
};

export default CardList;
