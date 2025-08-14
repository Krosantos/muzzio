import fs from "fs";
import { useContext, useCallback, useMemo } from "react";
import { CardContext } from "@contexts/Card";
import type SaveData from "./SaveData";
import { useFormat } from "@contexts/Format";
import { useCommander } from "@contexts/Commander";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useAttributes } from "@contexts/Attributes";

type UseAllContexts = () => SaveData;
const useAllContexts: UseAllContexts = () => {
  const { cards } = useContext(CardContext);
  return useMemo(() => {
    return {
      attributes: useAttributes.getState().attributes,
      cards,
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
  }, [cards]);
};

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
