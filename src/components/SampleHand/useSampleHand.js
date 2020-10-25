import { useCallback, useMemo, useReducer } from 'react';
import shuffle from 'lodash/shuffle';
import useCards from '@hooks/useCards';
import { HAND_SIZE } from '@constants';

const ADD_CARD = 'addcard';
const NEW_HAND = 'newhand';

const spreadCardsInDeck = (cardsInDeck) => {
  const deck = [];
  const hand = [];

  cardsInDeck.forEach(({ count, imageUrl, name }) => {
    const countInDeck = count || 1;

    for (let x = 0; x < countInDeck; x += 1)
      deck.push({ imageUrl, name });
  });
  const shuffled = shuffle(deck);

  for (let x = 0; x < HAND_SIZE; x += 1)
    hand.push(shuffled.pop());

  return {
    cardsInDeck: shuffled,
    cardsInHand: hand,
  };
};

const useShuffledDeck = () => {
  const { cardsInDeck } = useCards();
  const shuffledCards = useMemo(() => spreadCardsInDeck(cardsInDeck()), [cardsInDeck]);

  return shuffledCards;
};

const sampleHandReducer = ({ cardsInDeck, cardsInHand }, action) => {
  let newDeck;

  let newHand;

  switch (action) {
  case ADD_CARD:
    newDeck = [...cardsInDeck];
    newHand = [...cardsInHand];

    newHand.push(newDeck.pop());
    break;
  case NEW_HAND:
    newDeck = shuffle([].concat(cardsInDeck, cardsInHand));
    newHand = [];
    for (let x = 0; x < HAND_SIZE; x += 1)
      newHand.push(newDeck.pop());

    break;
  default:
    break;
  }

  return { cardsInDeck: newDeck, cardsInHand: newHand };
};

const useSampleHand = () => {
  const initialState = useShuffledDeck();
  const [{ cardsInHand }, dispatch] = useReducer(sampleHandReducer, initialState);
  const addCard = useCallback(() => dispatch(ADD_CARD), []);
  const generateNewHand = useCallback(() => dispatch(NEW_HAND), []);

  return { addCard, cardsInHand, generateNewHand };
};

export default useSampleHand;
