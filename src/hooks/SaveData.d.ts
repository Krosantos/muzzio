import type { SaveableCommanderContext } from "@contexts/Commander";
import type { SaveableOathbreakerContext } from "@contexts/Oathbreaker";
import type { Format } from "@contexts/Format";
import { SaveableAttributeContext } from "@contexts/Attributes";
import { SaveableCardContext } from "@contexts/Card";

type SaveData = {
  attributes?: SaveableAttributeContext;
  cards?: SaveableCardContext;
  commanderData?: SaveableCommanderContext;
  format?: Format;
  oathbreakerData?: SaveableOathbreakerContext;
};

export default SaveData;
