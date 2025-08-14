import { useContext, useCallback } from "react";
import { CommanderContext } from "@contexts/Commander";
import { CardContext } from "@contexts/Card";
import { AttributesContext } from "@contexts/Attributes";
import { FormatContext } from "@contexts/Format";
import { ALL_CARDS, OVERWRITE, COMMANDER } from "@constants";
import type SaveData from "./SaveData";

type UseOverwrite = () => (saveData: SaveData) => void;

const useOverwrite: UseOverwrite = () => {
  const { setAttributes } = useContext(AttributesContext);
  const { dispatch: cardsDispatch } = useContext(CardContext);
  const { setCommanderData } = useContext(CommanderContext);
  const { setFormat } = useContext(FormatContext);

  const overwrite = useCallback(
    (saveData) => {
      const {
        attributes = [ALL_CARDS],
        cards = {},
        commanderData = {},
        format = COMMANDER,
      } = saveData;

      setFormat(format);
      setAttributes(attributes);
      cardsDispatch({ overriddenState: cards, type: OVERWRITE });
      setCommanderData(commanderData);
    },
    [cardsDispatch, setAttributes, setCommanderData, setFormat,],
  );

  return overwrite;
};

export default useOverwrite;
