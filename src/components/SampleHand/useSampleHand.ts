import { Reducer, useCallback, useMemo, useReducer } from "react";
import shuffle from "lodash/shuffle";
import { HAND_SIZE } from "@constants";
import { useCards } from "@contexts/Card";
import { times } from "lodash";

const ADD_CARD = "addcard";
const NEW_HAND = "newhand";

type DisplayCard = {
  imageUrl: string;
  backImageUrl?: string;
  name: string;
};

type ShuffleState = {
  cardsInDeck: DisplayCard[];
  cardsInHand: DisplayCard[];
};

type SpreadCardsInHand = (
  cardsInDeck: { [cardName: string]: number },
  cardData: { [cardName: string]: Card },
) => ShuffleState;
const spreadCardsInDeck: SpreadCardsInHand = (cardsInDeck, cardData) => {
  const deck: DisplayCard[] = [];
  const hand: DisplayCard[] = [];
  const cardNames = Object.keys(cardsInDeck);
  for (let name of cardNames) {
    const count = cardsInDeck[name];
    const card = cardData[name];
    if (!card) continue;
    times(count, () =>
      deck.push({ imageUrl: card.imageUrl, backImageUrl: card.reverseUrl, name }),
    );
  }
  const shuffled = shuffle(deck);

  for (let x = 0; x < HAND_SIZE; x += 1) {
    const card = shuffled.pop();

    if (card) hand.push(card);
  }

  return {
    cardsInDeck: shuffled,
    cardsInHand: hand,
  };
};

type UseShuffledDeck = () => ShuffleState;
const useShuffledDeck: UseShuffledDeck = () => {
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const cardData = useCards((s) => s.cardData);
  const shuffledCards = useMemo(
    () => spreadCardsInDeck(cardsInDeck, cardData),
    [cardData, cardsInDeck],
  );

  return shuffledCards;
};

type Action = typeof ADD_CARD | typeof NEW_HAND;

const sampleHandReducer: Reducer<ShuffleState, Action> = (
  { cardsInDeck, cardsInHand },
  action,
) => {
  let newDeck;

  let newHand;

  switch (action) {
    case ADD_CARD:
      newDeck = [...cardsInDeck];
      newHand = [...cardsInHand];
      if (newDeck.length) newHand.push(newDeck.pop());
      break;
    case NEW_HAND:
      newDeck = shuffle([].concat(cardsInDeck, cardsInHand));
      newHand = [];
      for (let x = 0; x < HAND_SIZE; x += 1) {
        const topCard = newDeck.pop();

        if (topCard) newHand.push(topCard);
      }

      break;
    default:
      break;
  }

  return { cardsInDeck: newDeck, cardsInHand: newHand };
};

type UseSampleHand = () => {
  addCard: () => void;
  cardsInHand: DisplayCard[];
  generateNewHand: () => void;
};
const useSampleHand: UseSampleHand = () => {
  const initialState = useShuffledDeck();
  const [{ cardsInHand = [] }, dispatch] = useReducer(sampleHandReducer, initialState);
  const addCard = useCallback(() => dispatch(ADD_CARD), []);
  const generateNewHand = useCallback(() => dispatch(NEW_HAND), []);

  return { addCard, cardsInHand, generateNewHand };
};

export type { DisplayCard };
export default useSampleHand;
