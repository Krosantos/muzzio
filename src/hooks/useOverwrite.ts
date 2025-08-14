import { useCallback } from "react";
import type SaveData from "./SaveData";
import { useCommander } from "@contexts/Commander";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useFormat } from "@contexts/Format";
import { useAttributes } from "@contexts/Attributes";
import { useCards } from "@contexts/Card";

type UseOverwrite = () => (saveData: SaveData) => void;

const useOverwrite: UseOverwrite = () => {
  const loadCardData = useCards((s) => s.loadFromSave);
  const loadCommanderData = useCommander((s) => s.loadFromSave);
  const loadOathbreakerData = useOathbreaker((s) => s.loadFromSave);
  const loadFormatData = useFormat((s) => s.loadFromSave);
  const loadAttributesData = useAttributes((s) => s.loadFromSave);

  const overwrite = useCallback(
    (saveData: SaveData) => {
      loadCardData(saveData.cards);
      loadCommanderData(saveData.commanderData);
      loadOathbreakerData(saveData.oathbreakerData);
      loadFormatData(saveData.format);
      loadAttributesData(saveData.attributes);
    },
    [
      loadAttributesData,
      loadCardData,
      loadCommanderData,
      loadFormatData,
      loadOathbreakerData,
    ],
  );

  return overwrite;
};

export default useOverwrite;
