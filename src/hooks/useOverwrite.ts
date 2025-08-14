import { useContext, useCallback } from "react";
import { CardContext } from "@contexts/Card";
import { AttributesContext } from "@contexts/Attributes";
import { FormatContext } from "@contexts/Format";
import { ALL_CARDS, OVERWRITE, COMMANDER } from "@constants";
import type SaveData from "./SaveData";
import { useCommander } from "@contexts/Commander";
import { useOathbreaker } from "@contexts/Oathbreaker";

type UseOverwrite = () => (saveData: SaveData) => void;

const useOverwrite: UseOverwrite = () => {
  const { setAttributes } = useContext(AttributesContext);
  const { dispatch: cardsDispatch } = useContext(CardContext);
  const { setFormat } = useContext(FormatContext);

  const loadCommanderData = useCommander((s) => s.loadFromSave);
  const loadOathbreakerData = useOathbreaker((s) => s.loadFromSave);

  const overwrite = useCallback(
    (saveData) => {
      const { attributes = [ALL_CARDS], cards = {}, format = COMMANDER } = saveData;

      loadCommanderData(saveData.commanderData);
      loadOathbreakerData(saveData.oathbreakerData);
      setFormat(format);
      setAttributes(attributes);
      cardsDispatch({ overriddenState: cards, type: OVERWRITE });
    },
    [cardsDispatch, loadCommanderData, loadOathbreakerData, setAttributes, setFormat],
  );

  return overwrite;
};

export default useOverwrite;
