import path from "path";
import { useEffect } from "react";
import { AUTOSAVE } from "@constants";
import useSave from "./useSave";

const { app } = require("electron").remote;

type UseAutoSave = () => void;
const useAutoSave: UseAutoSave = () => {
  const basePath = app.getPath("userData");
  const writePath = path.join(basePath, AUTOSAVE);
  const save = useSave();

  useEffect(() => {
    const autoSave = setInterval(() => save(writePath), 10000);

    return () => clearInterval(autoSave);
  });
};

export default useAutoSave;
