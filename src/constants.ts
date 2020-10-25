/* eslint-disable max-lines */
const UPDATE_ACTION = 'update';
const ADD_ACTION = 'add';
const REMOVE_ACTION = 'remove';
const OVERWRITE = 'overwrite';

const CARD_MAX = 4;
const HAND_SIZE = 7;

const ALL_CARDS = 'All Cards';

const ANY_PARTNER = 'partner';
const SPECIFIC_PARTNER = 'specific';
const NO_PARTNER = 'none';

const AUTOSAVE = 'autosave';
const CURRENT_FILE_SETTING = 'currentFilePath';
const OPEN_FOLDER_SETTING = 'openFilePath';

const MODERN = 'modern';
const COMMANDER = 'commander';
const OATHBREAKER = 'oathbreaker';
const STANDARD = 'standard';
const PIONEER = 'pioneer';
const VINTAGE = 'vintage';
const LEGACY = 'legacy';
const PAUPER = 'pauper';

const singletonFormats = [
  COMMANDER,
  OATHBREAKER,
];

const formats = [
  MODERN,
  COMMANDER,
  OATHBREAKER,
  STANDARD,
  PIONEER,
  VINTAGE,
  LEGACY,
  PAUPER,
];

const oathbreakerBanlist = [
  'Ad Nauseam',
  'Ancestral Recall',
  'Balance',
  'Biorhythm',
  'Black Lotus',
  'Channel',
  'Doomsday',
  'Emrakul, the Aeons Torn',
  'Expropriate',
  'Fastbond',
  'Gifts Ungiven',
  'Griselbrand',
  'High Tide',
  'Library of Alexandria',
  'Limited Resources',
  'Lion’s Eye Diamond',
  'Mana Crypt',
  'Mana Geyser',
  'Mana Vault',
  'Mox Emerald',
  'Mox Jet',
  'Mox Pearl',
  'Mox Ruby',
  'Mox Sapphire',
  'Natural Order',
  "Painter's Servant",
  'Panoptic Mirror',
  'Primal Surge',
  'Saheeli, the Gifted',
  'Sol Ring',
  'Sundering Titan',
  'Sway of the Stars',
  'Sylvan Primordial',
  'Time Vault',
  'Time Walk',
  'Tinker',
  'Tolarian  Academy',
  'Tooth and Nail',
  'Trade Secrets',
  'Upheaval',
  'Worldfire',
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
  NO_PARTNER,
  AUTOSAVE,
  CURRENT_FILE_SETTING,
  OPEN_FOLDER_SETTING,
  MODERN,
  PIONEER,
  COMMANDER,
  OATHBREAKER,
  STANDARD,
  VINTAGE,
  LEGACY,
  PAUPER,
  formats,
  singletonFormats,
  oathbreakerBanlist,
};
