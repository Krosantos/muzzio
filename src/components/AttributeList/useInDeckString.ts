import { useMemo } from "react";
import filter from "lodash/filter";
import { useFormat } from "@contexts/Format";
import { useCards } from "@contexts/Card";
import { Attribute } from "@contexts/Attributes";

type GetSingletonString = (
  cardNames: string[],
  cardsInDeck: { [cardName: string]: number },
) => string;
const getSingletonString: GetSingletonString = (cardNames, cardsInDeck) => {
  const inDeck = filter(cardNames, (name) => !!cardsInDeck[name]).length;
  const inTotal = cardNames.length;

  return ` - ${inDeck} of ${inTotal}`;
};

type GetNonSingletonString = (
  cardNames: string[],
  cardsInDeck: { [cardName: string]: number },
  cardsInSideboard: { [cardName: string]: number },
) => string;
const getNonSingletonString: GetNonSingletonString = (
  cardNames,
  cardsInDeck,
  cardsInSideboard,
) => {
  const inDeck = filter(cardNames, (name) => !!cardsInDeck[name]).length;
  const inSideboard = filter(cardNames, (name) => !!cardsInSideboard[name]).length;

  let result = ` - ${inDeck}`;

  if (inSideboard < 1) return result;
  result += `/(${inSideboard})`;
  return result;
};

type UseInDeckString = (attribute: Attribute) => string;
const useInDeckString: UseInDeckString = (attribute) => {
  const isSingleton = useFormat((s) => s.isSingleton);
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const cardsInSideboard = useCards((s) => s.cardsInSideboard);

  const cardNames = Object.keys(attribute.cards);

  const inDeckString = useMemo(() => {
    if (isSingleton) return getSingletonString(cardNames, cardsInDeck);
    return getNonSingletonString(cardNames, cardsInDeck, cardsInSideboard);
  }, [cardNames, cardsInDeck, cardsInSideboard, isSingleton]);

  return inDeckString;
};

export default useInDeckString;
