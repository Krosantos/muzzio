import React, { useMemo } from 'react';
import useCards from '@hooks/useCards';
import { countContainer } from './styles.scss';

const LANDS = 'Lands: ';

const getLandCount = (cardsInDeck) => {
  const landsInDeck = cardsInDeck().filter(({ type }) => type.includes('Land'));

  let count = 0;

  landsInDeck.forEach((card) => {
    count += (card.count || 1);
  });
  return count;
};

const LandCount = () => {
  const { cardsInDeck } = useCards();
  const landCount = useMemo(() => getLandCount(cardsInDeck), [cardsInDeck]);

  return (
    <div className={countContainer}>
      {LANDS}
      {landCount}
    </div>
  );
};

export default LandCount;
