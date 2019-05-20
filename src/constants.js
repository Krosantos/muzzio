const UPDATE_ACTION = 'update';
const ADD_ACTION = 'add';
const REMOVE_ACTION = 'remove';
const OVERWRITE = 'overwrite';

const ALL_CARDS = 'All Cards';
const IS_IN_DECK = 'indeck';

const ANY_PARTNER = 'partner';
const SPECIFIC_PARTNER = 'specific';
const NO_PARTNER = 'none';

const AUTOSAVE = 'autosave';

const identityMap = {
	B: {
		attributes: {},
		cmc: 0,
		colors: [],
		cost: '',
		id: '24eeb424-235d-4346-9355-57914e740ec6',
		identity: [
			'B',
		],
		imageUrl: 'https://img.scryfall.com/cards/normal/front/2/4/24eeb424-235d-4346-9355-57914e740ec6.jpg?1557577534',
		name: 'Swamp',
		partnerQuery: {
			type: 'none',
		},
		type: 'Basic Land — Swamp',
	},
	C: {
		attributes: {},
		cmc: 0,
		colors: [],
		cost: '',
		id: '9cc070d3-4b83-4684-9caf-063e5c473a77',
		identity: [],
		imageUrl: 'https://img.scryfall.com/cards/normal/en/ogw/183a.jpg?1530757398',
		name: 'Wastes',
		partnerQuery: {
			type: 'none',
		},
		type: 'Basic Land',
	},
	G: {
		attributes: {},
		cmc: 0,
		colors: [],
		cost: '',
		id: 'a9d61651-349e-40d0-a7c4-c9561e190405',
		identity: [
			'G',
		],
		imageUrl: 'https://img.scryfall.com/cards/normal/front/a/9/a9d61651-349e-40d0-a7c4-c9561e190405.jpg?1557577572',
		name: 'Forest',
		partnerQuery: {
			type: 'none',
		},
		type: 'Basic Land — Forest',
	},
	R: {
		attributes: {},
		cmc: 0,
		colors: [],
		cost: '',
		id: '489fdba7-5c25-4cf3-a1e0-3e0fda6c6ee6',
		identity: [
			'R',
		],
		imageUrl: 'https://img.scryfall.com/cards/normal/front/4/8/489fdba7-5c25-4cf3-a1e0-3e0fda6c6ee6.jpg?1557577552',
		name: 'Mountain',
		partnerQuery: {
			type: 'none',
		},
		type: 'Basic Land — Mountain',
	},
	U: {
		attributes: {},
		cmc: 0,
		colors: [],
		cost: '',
		id: '7014b9fc-a906-4ffd-a482-22ba8dbe3b4a',
		identity: [
			'U',
		],
		imageUrl: 'https://img.scryfall.com/cards/normal/front/7/0/7014b9fc-a906-4ffd-a482-22ba8dbe3b4a.jpg?1557577515',
		name: 'Island',
		partnerQuery: {
			type: 'none',
		},
		type: 'Basic Land — Island',
	},
	W: {
		attributes: {},
		cmc: 0,
		colors: [],
		cost: '',
		id: 'd92ef517-2417-43a2-8b1a-0673d1531c65',
		identity: [
			'W',
		],
		imageUrl: 'https://img.scryfall.com/cards/normal/front/d/9/d92ef517-2417-43a2-8b1a-0673d1531c65.jpg?1557577493',
		name: 'Plains',
		partnerQuery: {
			type: 'none',
		},
		type: 'Basic Land — Plains',
	},
};

const MODERN = 'modern';
const COMMANDER = 'commander';
const OATHBREAKER = 'oathbreaker';
const STANDARD = 'standard';

const formats = [
	MODERN,
	COMMANDER,
	OATHBREAKER,
	STANDARD,
];

export {
	ADD_ACTION,
	REMOVE_ACTION,
	UPDATE_ACTION,
	OVERWRITE,
	ALL_CARDS,
	IS_IN_DECK,
	ANY_PARTNER,
	SPECIFIC_PARTNER,
	NO_PARTNER,
	AUTOSAVE,
	identityMap,
	MODERN,
	COMMANDER,
	OATHBREAKER,
	STANDARD,
	formats,
};
