import path from "path";
import fs from "fs";
import settings from "electron-settings";
import setWindowTitle from "@utils/setWindowTitle";
import { AUTOSAVE, CURRENT_FILE_SETTING } from "@constants";
import useLoad from "./useLoad";
import SaveData from "./SaveData";

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

  return load(readPath);
};

export default useAutoLoad;
