import type { SaveableCommanderContext } from "@contexts/Commander";
import type { SaveableOathbreakerContext } from "@contexts/Oathbreaker";
import type { CardState } from "@contexts/Card";
import type { Format } from "@contexts/Format";

type SaveData = {
  attributes?: string[];
  cards?: CardState;
  commanderData?: SaveableCommanderContext;
  format?: Format;
  oathbreakerData?: SaveableOathbreakerContext;
};

export default SaveData;
