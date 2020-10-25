import React, { useMemo } from 'react';
import capitalize from 'lodash/capitalize';
import useFormat from '@hooks/useFormat';
import useCards from '@hooks/useCards';
import ManaCost from '@components/ManaCost';
import CardCount from './CardCount';
import {
  container,
  formatName,
  manaCost,
} from './styles.scss';

const convertIdentityToCost = (identity) => {
  if (identity.length === 0)
    return '{C}';
  return `{${identity.join('}{')}}`;
};

const getIdentityFromCards = (cardsInDeck = []) => {
  const identityMap = {};

  cardsInDeck.forEach((card) => {
    const { identity = [] } = card;

    identity.forEach((color) => {
      identityMap[color] = true;
    });
  });
  const identity = Object.keys(identityMap);

  return convertIdentityToCost(identity);
};

const Oathbreaker = () => {
  const { format } = useFormat();
  const formattedFormat = useMemo(() => capitalize(format), [format]);
  const { cardsInDeck } = useCards();
  const deckIdentity = useMemo(() => getIdentityFromCards(cardsInDeck()),
    [cardsInDeck]);

  return (
    <div className={container}>
      <div className={formatName}>
        {formattedFormat}
      </div>
      <CardCount />
      <div className={manaCost}>
        <ManaCost className={manaCost} cost={deckIdentity} />
      </div>

    </div>
  );
};

export default Oathbreaker;

