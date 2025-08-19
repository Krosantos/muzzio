import { useMemo } from "react";
import sortBy from "lodash/sortBy";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useCommander } from "@contexts/Commander";
import { useFormat } from "@contexts/Format";
import { useCards } from "@contexts/Card";
import { isEmpty } from "lodash";

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

type UseBoard = () => Card[];
const useMaindeck: UseBoard = () => {
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const cardData = useCards((s) => s.cardData);
  const format = useFormat((s) => s.format);

  const commander = useCommander((s) => s.commander);
  const partner = useCommander((s) => s.partner);
  const oathbreaker = useOathbreaker((s) => s.oathbreaker);
  const signatureSpell = useOathbreaker((s) => s.signatureSpell);

  const unsortedCards = useMemo(() => {
    return Object.keys(cardsInDeck)
      .map((name) => cardData[name])
      .filter((c) => !isEmpty(c));
  }, [cardData, cardsInDeck]);

  return useMemo(() => {
    const sorted = sortCards(unsortedCards);
    switch (format) {
      case "COMMANDER":
      case "BRAWL":
        !isEmpty(commander) && sorted.push(commander);
        !isEmpty(partner) && sorted.push(partner);
        break;
      case "OATHBREAKER":
        !isEmpty(oathbreaker) && sorted.push(oathbreaker);
        !isEmpty(signatureSpell) && sorted.push(signatureSpell);
        break;
    }
    return sorted;
  }, [commander, format, oathbreaker, partner, signatureSpell, unsortedCards]);
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
