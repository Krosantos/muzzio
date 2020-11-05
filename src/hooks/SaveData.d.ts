import type { CommanderData } from "@contexts/Commander";
import type { OathbreakerData } from "@contexts/Oathbreaker";
import type { CardState } from "@contexts/Card";
import type { Format } from "@contexts/Format";

type SaveData = {
  attributes?: string[];
  cards?: CardState;
  commanderData?: CommanderData;
  format?: Format;
  oathbreakerData?: OathbreakerData;
};

export default SaveData;
