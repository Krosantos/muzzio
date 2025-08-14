import { useContext, useCallback } from "react";
import { CardContext } from "@contexts/Card";
import { OVERWRITE } from "@constants";
import type SaveData from "./SaveData";
import { useCommander } from "@contexts/Commander";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useFormat } from "@contexts/Format";
import { useAttributes } from "@contexts/Attributes";

type UseOverwrite = () => (saveData: SaveData) => void;

const useOverwrite: UseOverwrite = () => {
  const { dispatch: cardsDispatch } = useContext(CardContext);

  const loadCommanderData = useCommander((s) => s.loadFromSave);
  const loadOathbreakerData = useOathbreaker((s) => s.loadFromSave);
  const loadFormatData = useFormat((s) => s.loadFromSave);
  const loadAttributesData = useAttributes((s) => s.loadFromSave);

  const overwrite = useCallback(
    (saveData: SaveData) => {
      const { cards = {} } = saveData;

      loadCommanderData(saveData.commanderData);
      loadOathbreakerData(saveData.oathbreakerData);
      loadFormatData(saveData.format);
      loadAttributesData({ attributes: saveData.attributes });
      cardsDispatch({ overriddenState: cards, type: OVERWRITE });
    },
    [
      cardsDispatch,
      loadAttributesData,
      loadCommanderData,
      loadFormatData,
      loadOathbreakerData,
    ],
  );

  return overwrite;
};

export default useOverwrite;
