import { useCallback, useMemo } from "react";

const { clipboard } = require("electron").remote;

type FormatCards = (cards: Card[]) => string;
const formatCards: FormatCards = (cards) => {
  const names = cards.map(({ name, count }) => `${count || 1} ${name}`);

  return names.join("\r\n");
};

type UseExport = (maindeck: Card[], sideboard: Card[]) => () => Promise<void>;
const useExport: UseExport = (maindeck = [], sideboard = []) => {
  const toWrite = useMemo(() => {
    const formattedMain = formatCards(maindeck);

    if (!sideboard.length) return formattedMain;
    const formattedSide = formatCards(sideboard);

    return `${formattedMain}\r\n\r\n${formattedSide}`;
  }, [maindeck, sideboard]);
  const exportList = useCallback(async () => {
    clipboard.writeText(toWrite);
  }, [toWrite]);

  return exportList;
};

export default useExport;
