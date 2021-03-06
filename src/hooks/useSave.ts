import fs from "fs";
import { useContext, useCallback } from "react";
import { CommanderContext } from "@contexts/Commander";
import { OathbreakerContext } from "@contexts/Oathbreaker";
import { CardContext } from "@contexts/Card";
import { AttributesContext } from "@contexts/Attributes";
import { FormatContext } from "@contexts/Format";
import type SaveData from "./SaveData";

type UseAllContexts = () => SaveData;
const useAllContexts: UseAllContexts = () => {
  const { attributes } = useContext(AttributesContext);
  const { cards } = useContext(CardContext);
  const { commanderData } = useContext(CommanderContext);
  const { oathbreakerData } = useContext(OathbreakerContext);
  const { format } = useContext(FormatContext);

  return {
    attributes,
    cards,
    commanderData,
    format,
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
