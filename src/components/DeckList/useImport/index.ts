import { useCallback } from "react";
import lookUpCards from "./lookUpCards";
import { useFormat } from "@contexts/Format";
import { useCards } from "@contexts/Card";

const { clipboard } = require("electron").remote;

type UseImport = () => () => Promise<void>;
const useImport: UseImport = () => {
  const addCard = useCards((s) => s.addCard);
  const clearDeck = useCards((s) => s.clearDeck);
  const isSingleton = useFormat((s) => s.isSingleton);
  const importFile = useCallback(async () => {
    const raw = clipboard.readText();

    clearDeck();
    const newDeck = await lookUpCards(raw, isSingleton);

    newDeck.forEach((card) => {
      addCard({ ...card });
    });
  }, [addCard, clearDeck, isSingleton]);

  return importFile;
};

export default useImport;
