import fs from "fs";
import { useCallback, useMemo } from "react";
import type SaveData from "./SaveData";
import { useFormat } from "@contexts/Format";
import { useCommander } from "@contexts/Commander";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useAttributes } from "@contexts/Attributes";
import { useCards } from "@contexts/Card";

type UseAllContexts = () => SaveData;
const useAllContexts: UseAllContexts = () =>
  useMemo(() => {
    return {
      attributes: {
        attributes: useAttributes.getState().attributes,
      },
      cards: {
        cardData: useCards.getState().cardData,
        cardsInDeck: useCards.getState().cardsInDeck,
        cardsInSideboard: useCards.getState().cardsInSideboard,
      },
      format: useFormat.getState().format,
      commanderData: {
        commander: useCommander.getState().commander,
        partner: useCommander.getState().partner,
      },
      oathbreakerData: {
        oathbreaker: useOathbreaker.getState().oathbreaker,
        signatureSpell: useOathbreaker.getState().signatureSpell,
      },
    };
  }, []);

type UseSave = () => (filePath: string) => void;

const useSave: UseSave = () => {
  const allData = useAllContexts();

  const save = useCallback(
    (filePath) => {
      const fileContents = JSON.stringify(allData);

      fs.writeFileSync(filePath, fileContents);
    },
    [allData],
  );

  return save;
};

export default useSave;
