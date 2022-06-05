const UPDATE_ACTION = "update";
const ADD_ACTION = "add";
const REMOVE_ACTION = "remove";
const OVERWRITE = "overwrite";

const CARD_MAX = 4;
const HAND_SIZE = 7;

const ALL_CARDS = "All Cards";

const ANY_PARTNER = "partner";
const SPECIFIC_PARTNER = "specific";
const FRIENDS_FOREVER = "friends";
const BACKGROUND_PARTNER = "background";
const NO_PARTNER = "none";

const AUTOSAVE = "autosave";
const CURRENT_FILE_SETTING = "currentFilePath";
const OPEN_FOLDER_SETTING = "openFilePath";

const MODERN = "MODERN";
const COMMANDER = "COMMANDER";
const OATHBREAKER = "OATHBREAKER";
const STANDARD = "STANDARD";
const PIONEER = "PIONEER";
const VINTAGE = "VINTAGE";
const LEGACY = "LEGACY";
const PAUPER = "PAUPER";
const BRAWL = "BRAWL";

const singletonFormats = [COMMANDER, OATHBREAKER];

const formats = {
  BRAWL,
  COMMANDER,
  LEGACY,
  MODERN,
  OATHBREAKER,
  PAUPER,
  PIONEER,
  STANDARD,
  VINTAGE,
};

const oathbreakerBanlist = [
  "Ad Nauseam",
  "Ancestral Recall",
  "Balance",
  "Biorhythm",
  "Black Lotus",
  "Channel",
  "Doomsday",
  "Emrakul, the Aeons Torn",
  "Expropriate",
  "Fastbond",
  "Gifts Ungiven",
  "Griselbrand",
  "High Tide",
  "Library of Alexandria",
  "Limited Resources",
  "Lion’s Eye Diamond",
  "Mana Crypt",
  "Mana Geyser",
  "Mana Vault",
  "Mox Emerald",
  "Mox Jet",
  "Mox Pearl",
  "Mox Ruby",
  "Mox Sapphire",
  "Natural Order",
  "Painter's Servant",
  "Panoptic Mirror",
  "Primal Surge",
  "Saheeli, the Gifted",
  "Sol Ring",
  "Sundering Titan",
  "Sway of the Stars",
  "Sylvan Primordial",
  "Time Vault",
  "Time Walk",
  "Tinker",
  "Tolarian  Academy",
  "Tooth and Nail",
  "Trade Secrets",
  "Upheaval",
  "Worldfire",
  "Yawgmoth's Bargain",
];

export {
  ADD_ACTION,
  REMOVE_ACTION,
  UPDATE_ACTION,
  OVERWRITE,
  CARD_MAX,
  HAND_SIZE,
  ALL_CARDS,
  ANY_PARTNER,
  SPECIFIC_PARTNER,
  BACKGROUND_PARTNER,
  FRIENDS_FOREVER,
  NO_PARTNER,
  AUTOSAVE,
  CURRENT_FILE_SETTING,
  OPEN_FOLDER_SETTING,
  MODERN,
  PIONEER,
  COMMANDER,
  OATHBREAKER,
  BRAWL,
  STANDARD,
  VINTAGE,
  LEGACY,
  PAUPER,
  formats,
  singletonFormats,
  oathbreakerBanlist,
};
