import { useContext, useCallback } from "react";
import filter from "lodash/filter";
import merge from "lodash/merge";
import get from "lodash/get";
import has from "lodash/has";
import set from "lodash/set";
import unset from "lodash/unset";
import clamp from "lodash/clamp";
import { CardContext } from "@contexts/Card";
import { CARD_MAX, ADD_ACTION, REMOVE_ACTION, UPDATE_ACTION } from "@constants";

type UseCards = () => {
  addAttribute: (card: Card, attribute: string) => void;
  addCard: (card: Card) => void;
  cardExists: (card: Card) => boolean;
  cards: { [name: string]: Card };
  cardsByAttribute: (attribute: string) => Card[];
  cardsInDeck: () => Card[];
  cardsInSideboard: () => Card[];
  clearDeck: () => void;
  getCard: (name: string) => Card;
  removeAttribute: (card: Card, attribute: string) => void;
  removeCard: (card: Card) => void;
  setCount: (card: Card, count: number) => void;
  setSideboardCount: (card: Card, sideboardCount: number) => void;
};

const useCards: UseCards = () => {
  const { cards, dispatch } = useContext(CardContext);

  const cardsByAttribute = useCallback(
    (attribute: string) =>
      filter(cards, (card) => get(card, ["attributes", attribute], false)),
    [cards],
  );

  const cardsInDeck = useCallback(() => {
    return filter(cards, (card) => card.count >= 1);
  }, [cards]);

  const cardsInSideboard = useCallback(() => {
    return filter(cards, (card) => card.sideboardCount >= 1);
  }, [cards]);

  const addCard = useCallback(
    (card: Card) => {
      const maybeCard = get(cards, card.name, { count: 1, sideboardCount: 1 });
      const { count, sideboardCount } = maybeCard;
      const toAdd = merge({}, maybeCard, card, { count, sideboardCount });

      dispatch({ card: toAdd, type: ADD_ACTION });
    },
    [cards, dispatch],
  );

  const removeCard = useCallback(
    (card: Card) => dispatch({ card, type: REMOVE_ACTION }),
    [dispatch],
  );

  const cardExists = useCallback(
    (card: Card) => {
      const name = get(card, "name");

      return name && has(cards, name);
    },
    [cards],
  );

  const addAttribute = useCallback(
    (card: Card, attribute: string) => {
      const toAdd = set(card, ["attributes", attribute], true);

      dispatch({ card: toAdd, type: UPDATE_ACTION });
    },
    [dispatch],
  );

  const removeAttribute = useCallback(
    (card: Card, attribute: string) => {
      const toDispatch = { ...card };

      unset(toDispatch, ["attributes", attribute]);

      dispatch({ card: toDispatch, type: UPDATE_ACTION });
    },
    [dispatch],
  );

  const setCount = useCallback(
    (card: Card, count: number) => {
      const { isUnlimited = false, sideboardCount = 0 } = card;
      const clampedSideboardCount = isUnlimited
        ? sideboardCount
        : clamp(sideboardCount, 0, CARD_MAX - count);
      const toDispatch = { ...card, count, sideboardCount: clampedSideboardCount };

      dispatch({ card: toDispatch, type: UPDATE_ACTION });
    },
    [dispatch],
  );

  const setSideboardCount = useCallback(
    (card: Card, sideboardCount: number) => {
      const { count = 0, isUnlimited = false } = card;
      const clampedCount = isUnlimited
        ? count
        : clamp(count, 0, CARD_MAX - sideboardCount);
      const toDispatch = { ...card, count: clampedCount, sideboardCount };

      dispatch({ card: toDispatch, type: UPDATE_ACTION });
    },
    [dispatch],
  );

  const clearDeck = useCallback(() => {
    cardsInDeck().forEach((card) => {
      const toSet = { ...card, count: 0 };

      dispatch({ card: toSet, type: UPDATE_ACTION });
    });
    cardsInSideboard().forEach((card) => {
      const toSet = { ...card, sideboardCount: 0 };

      dispatch({ card: toSet, type: UPDATE_ACTION });
    });
  }, [cardsInDeck, cardsInSideboard, dispatch]);

  const getCard = useCallback((name: string) => get(cards, name), [cards]);

  return {
    addAttribute,
    addCard,
    cardExists,
    cards,
    cardsByAttribute,
    cardsInDeck,
    cardsInSideboard,
    clearDeck,
    getCard,
    removeAttribute,
    removeCard,
    setCount,
    setSideboardCount,
  };
};

export default useCards;
