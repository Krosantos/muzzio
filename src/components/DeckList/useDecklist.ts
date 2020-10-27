import { useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";
import useCards from "@hooks/useCards";
import useCommander from "@hooks/useCommander";
import useFormat from "@hooks/useFormat";
import useOathbreaker from "@hooks/useOathbreaker";
import { OATHBREAKER, COMMANDER } from "@constants";
import { CommanderData } from "@contexts/Commander";
import { OathbreakerData } from "@contexts/Oathbreaker";

type SortCards = (cards: Card[]) => Card[];
const sortCards: SortCards = (cards) => {
  const byAlpha = sortBy(cards, ({ name }) => name);
  const byCmc = sortBy(byAlpha, ({ cmc }) => cmc);
  const byNotLand = sortBy(byCmc, ({ type }) => type.includes("Land"));
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

type AppendCards = (
  sortedCards: Card[],
  format: string,
  commanderData: CommanderData,
  oathbreakerData: OathbreakerData,
) => Card[];
// eslint-disable-next-line max-params, complexity
const appendCards: AppendCards = (
  sortedCards,
  format,
  commanderData,
  oathbreakerData,
) => {
  const cards = [...sortedCards];
  const { commander, partner } = commanderData;
  const { oathbreaker, signatureSpell } = oathbreakerData;

  if (format === COMMANDER) {
    if (!isEmpty(commander)) cards.push(commander);
    if (!isEmpty(partner)) cards.push(partner);
  }
  if (format === OATHBREAKER) {
    if (!isEmpty(oathbreaker)) cards.push(oathbreaker);
    if (!isEmpty(signatureSpell)) cards.push(signatureSpell);
  }

  return cards;
};

type UseBoard = () => Card[];
const useMaindeck: UseBoard = () => {
  const { cardsInDeck } = useCards();
  const commanderData = useCommander();
  const oathbreakerData = useOathbreaker();
  const { format } = useFormat();
  const sortedCards = useMemo(() => sortCards(cardsInDeck()), [cardsInDeck]);
  const mainCounted = getMaindeckCount(sortedCards);

  return appendCards(mainCounted, format, commanderData, oathbreakerData);
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
