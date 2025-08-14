import { useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";
import useCards from "@hooks/useCards";
import { OATHBREAKER, COMMANDER } from "@constants";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useCommander } from "@contexts/Commander";
import { useFormat } from "@contexts/Format";

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

type GetCardCount = (cards: Card[]) => Card[];
const getMaindeckCount: GetCardCount = (cards) =>
  cards.map((card) => ({ ...card, sideboardCount: 0 }));
const getSideboardCount: GetCardCount = (cards) =>
  cards.map((card) => {
    const { sideboardCount = 0 } = card;

    return { ...card, count: sideboardCount, sideboardCount: 0 };
  });

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
  const { cardsInDeck } = useCards();
  const { format } = useFormat();
  const sortedCards = useMemo(() => sortCards(cardsInDeck()), [cardsInDeck]);
  const mainCounted = getMaindeckCount(sortedCards);

  return useMemo(() => appendCards(mainCounted, format), [format, mainCounted]);
};

const useSideboard: UseBoard = () => {
  const { cardsInSideboard } = useCards();
  const countedAndSorted = useMemo(() => {
    const sorted = sortCards(cardsInSideboard());

    return getSideboardCount(sorted);
  }, [cardsInSideboard]);

  return countedAndSorted;
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
