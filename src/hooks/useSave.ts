import fs from "fs";
import { useCallback, useMemo } from "react";
import type SaveData from "./SaveData";
import { useFormat } from "@contexts/Format";
import { useCommander } from "@contexts/Commander";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useAttributes } from "@contexts/Attributes";
import { useCards } from "@contexts/Card";

const useSaveData = () => {
  const attributes = useAttributes((s) => s.attributes);
  const cardData = useCards((s) => s.cardData);
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const cardsInSideboard = useCards((s) => s.cardsInSideboard);
  const format = useFormat((s) => s.format);
  const commander = useCommander((s) => s.commander);
  const partner = useCommander((s) => s.partner);
  const oathbreaker = useOathbreaker((s) => s.oathbreaker);
  const signatureSpell = useOathbreaker((s) => s.signatureSpell);

  return useMemo<SaveData>(() => {
    return {
      attributes: {
        attributes,
      },
      cards: {
        cardData,
        cardsInDeck,
        cardsInSideboard,
      },
      format,
      commanderData: {
        commander,
        partner,
      },
      oathbreakerData: {
        oathbreaker,
        signatureSpell,
      },
    };
  }, [
    attributes,
    cardData,
    cardsInDeck,
    cardsInSideboard,
    commander,
    format,
    oathbreaker,
    partner,
    signatureSpell,
  ]);
};

type UseSave = () => (filePath: string) => void;

const useSave: UseSave = () => {
  const allData = useSaveData();

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
