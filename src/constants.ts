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
};
