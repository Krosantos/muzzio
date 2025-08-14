import fs from "fs";
import { useContext, useCallback } from "react";
import { CardContext } from "@contexts/Card";
import type SaveData from "./SaveData";
import { useFormat } from "@contexts/Format";
import { SaveableCommanderContext, useCommander } from "@contexts/Commander";
import { SaveableOathbreakerContext, useOathbreaker } from "@contexts/Oathbreaker";
import { useAttributes } from "@contexts/Attributes";

type UseAllContexts = () => SaveData;
const useAllContexts: UseAllContexts = () => {
  const { cards } = useContext(CardContext);

  const attributes: string[] = useAttributes(({ attributes }) => attributes);
  const format: Format = useFormat(({ format }) => format);
  const commanderData: SaveableCommanderContext = useCommander(
    ({ commander, partner }) => ({ commander, partner }),
  );
  const oathbreakerData: SaveableOathbreakerContext = useOathbreaker(
    ({ oathbreaker, signatureSpell }) => ({ oathbreaker, signatureSpell }),
  );

  return {
    attributes,
    cards,
    format,
    commanderData,
    oathbreakerData,
  };
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
