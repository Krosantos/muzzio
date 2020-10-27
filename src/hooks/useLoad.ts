import fs from "fs";
import { useCallback } from "react";
import SaveData from "./SaveData";

type UseLoad = () => (filePath: string) => SaveData;
const useLoad: UseLoad = () => {
  const load = useCallback((filePath) => {
    try {
      const raw = fs.readFileSync(filePath).toString("utf8");

      const result = JSON.parse(raw) as SaveData;
      // Temporary, until I map/update it

      result.format = result.format.toUpperCase() as SaveData["format"];
      return result;
    } catch (e) {
      return {};
    }
  }, []);

  return load;
};

export default useLoad;
