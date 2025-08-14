import { useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";
import { OATHBREAKER, COMMANDER } from "@constants";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useCommander } from "@contexts/Commander";
import { useFormat } from "@contexts/Format";
import { useCards } from "@contexts/Card";

type SortCards = (cards: Card[]) => Card[];
const sortCards: SortCards = (cards) => {
  const byAlpha = sortBy(cards, ({ name }) => name);
  const byCmc = sortBy(byAlpha, ({ cmc }) => cmc);
  const byNotLand = sortBy(byCmc, ({ type }) => {
    // Don't sort MDFCs, unless they're pure lands.
    return type.includes("Land") && (!type.includes("//") || type === "Land // Land");
  });
  const byNotBasicLand = sortBy(byNotLand, ({ type }) => type.includes("Basic"));

  return byNotBasicLand;
};

type AppendCards = (sortedCards: Card[], format: string) => Card[];

const appendCards: AppendCards = (sortedCards, format) => {
  const cards = [...sortedCards];

  if (format === COMMANDER) {
    const { commander, partner } = useCommander.getState();
    if (!isEmpty(commander)) cards.push(commander);
    if (!isEmpty(partner)) cards.push(partner);
  }
  if (format === OATHBREAKER) {
    const { oathbreaker, signatureSpell } = useOathbreaker.getState();
    if (!isEmpty(oathbreaker)) cards.push(oathbreaker);
    if (!isEmpty(signatureSpell)) cards.push(signatureSpell);
  }

  return cards;
};

type UseBoard = () => Card[];
const useMaindeck: UseBoard = () => {
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const cardData = useCards((s) => s.cardData);
  const format = useFormat((s) => s.format);

  const unsortedCards = useMemo(() => {
    return Object.keys(cardsInDeck)
      .map((name) => cardData[name])
      .filter((c) => !!c);
  }, [cardData, cardsInDeck]);

  const sortedCards = useMemo(() => sortCards(unsortedCards), [unsortedCards]);
  return useMemo(() => appendCards(sortedCards, format), [format, sortedCards]);
};

const useSideboard: UseBoard = () => {
  const cardsInSideboard = useCards((s) => s.cardsInSideboard);
  const cardData = useCards((s) => s.cardData);

  const unsortedCards = useMemo(() => {
    return Object.keys(cardsInSideboard)
      .map((name) => cardData[name])
      .filter((c) => !!c);
  }, [cardData, cardsInSideboard]);

  const sortedCards = sortCards(unsortedCards);
  return sortedCards;
};

type UseDecklist = () => {
  maindeck: Card[];
  sideboard: Card[];
};
const useDecklist: UseDecklist = () => {
  const maindeck = useMaindeck();
  const sideboard = useSideboard();

  return {
    maindeck,
    sideboard,
  };
};

export default useDecklist;
