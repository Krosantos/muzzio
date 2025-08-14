import path from "path";
import fs from "fs";
import settings from "electron-settings";
import setWindowTitle from "@utils/setWindowTitle";
import { AUTOSAVE, CURRENT_FILE_SETTING } from "@constants";
import useLoad from "./useLoad";
import SaveData from "./SaveData";
import { useMemo } from "react";
import { useCommander } from "@contexts/Commander";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useFormat } from "@contexts/Format";
import { useAttributes } from "@contexts/Attributes";

const { app } = require("electron").remote;

type UseAutoLoad = () => SaveData;

const useAutoLoad: UseAutoLoad = () => {
  let readPath = "";
  const currentFile = settings.getSync(CURRENT_FILE_SETTING) as string;
  const currentFileExists = fs.existsSync(currentFile);

  if (currentFileExists && currentFile.length > 1) {
    readPath = settings.getSync(CURRENT_FILE_SETTING) as string;
    setWindowTitle(readPath);
  } else {
    const basePath = app.getPath("userData");

    readPath = path.join(basePath, AUTOSAVE);
  }

  const load = useLoad();

  const loadedData = useMemo(() => load(readPath), [load, readPath]);
  const loadCommander = useCommander((s) => s.loadFromSave);
  const loadOathbreaker = useOathbreaker((s) => s.loadFromSave);
  const loadFormat = useFormat((s) => s.loadFromSave);
  const loadAttributes = useAttributes((s) => s.loadFromSave);

  loadCommander(loadedData.commanderData);
  loadOathbreaker(loadedData.oathbreakerData);
  loadFormat(loadedData.format);
  loadAttributes(loadedData.attributes);

  return loadedData;
};

export default useAutoLoad;
