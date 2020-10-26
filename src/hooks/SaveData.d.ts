import type { CommanderData } from '@contexts/Commander';
import type { OathbreakerData } from '@contexts/Oathbreaker';
import type { CardState } from '@contexts/Card';

type SaveData = {
    attributes?: string[];
    cards?: CardState;
    commanderData?: CommanderData;
    format?: "COMMANDER" | "LEGACY" | "MODERN" | "OATHBREAKER" | "PAUPER" | "PIONEER" | "STANDARD" | "VINTAGE";
    oathbreakerData?: OathbreakerData;
  }

export default SaveData;
