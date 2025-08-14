import { useCallback } from "react";
import useCards from "@hooks/useCards";
import lookUpCards from "./lookUpCards";
import { useFormat } from "@contexts/Format";

const { clipboard } = require("electron").remote;

type UseImport = () => () => Promise<void>;
const useImport: UseImport = () => {
  const { addCard, clearDeck } = useCards();
  const { isSingleton } = useFormat();
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
