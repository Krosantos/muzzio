import { useCards } from "@contexts/Card";
import { useCallback, useMemo } from "react";

const { clipboard } = require("electron").remote;

type FormatCards = (cards: Card[], isMain: boolean) => string;
const formatCards: FormatCards = (cards, isMain) => {
  const names = cards.map(({ name }) => {
    const mainCount = useCards.getState().cardsInDeck[name];
    const sideCount = useCards.getState().cardsInSideboard[name];
    const count = isMain ? mainCount : sideCount;
    return `${count || 1} ${name}`;
  });

  return names.join("\r\n");
};

type UseExport = (maindeck: Card[], sideboard: Card[]) => () => Promise<void>;
const useExport: UseExport = (maindeck = [], sideboard = []) => {
  const toWrite = useMemo(() => {
    const formattedMain = formatCards(maindeck, true);

    if (!sideboard.length) return formattedMain;
    const formattedSide = formatCards(sideboard, false);

    return `${formattedMain}\r\n\r\n${formattedSide}`;
  }, [maindeck, sideboard]);
  const exportList = useCallback(async () => {
    clipboard.writeText(toWrite);
  }, [toWrite]);

  return exportList;
};

export default useExport;
