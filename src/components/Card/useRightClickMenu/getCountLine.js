import { CARD_MAX, singletonFormats } from '@constants';
import { remote } from 'electron';

const { MenuItem } = remote;

const generateUnlimitedMenu = () => {};

const generateSubmenu = (card, setCount) => {
	const submenu = [];

	for (let x = 1; x <= CARD_MAX; x += 1) {
		submenu.push({
			click: () => setCount(card, x),
			label: `Set count to ${x}`,
		});
	}
	return submenu;
};

// eslint-disable-next-line max-params
const getCountLine = (format, card, menu, setCount) => {
	const { isUnlimited = false } = card;
	const isSingleton = singletonFormats.includes(format);

	if (isSingleton && !isUnlimited)
		return;

	if (isUnlimited) {
		menu.append(generateUnlimitedMenu());
	} else {
		menu.append(
			new MenuItem({
				label: 'Set Count',
				submenu: generateSubmenu(card, setCount),
			}),
		);
	}
};

export default getCountLine;
