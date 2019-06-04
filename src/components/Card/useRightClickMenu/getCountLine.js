import { CARD_MAX } from '@constants';
import { remote } from 'electron';

const { MenuItem } = remote;

const generateUnlimitedMenu = (openCountModal) => new MenuItem({
	click: openCountModal,
	label: 'Set Count',
});

const generateSubmenu = (card, setCount) => {
	const submenu = [];

	for (let x = 0; x <= CARD_MAX; x += 1) {
		submenu.push({
			click: () => setCount(card, x),
			label: `Set count to ${x}`,
		});
	}
	return submenu;
};

// eslint-disable-next-line max-params
const getCountLine = (isSingleton, card, menu, setCount, openCountModal) => {
	const { isUnlimited = false } = card;

	if (isSingleton && !isUnlimited)
		return;

	if (isUnlimited) {
		menu.append(generateUnlimitedMenu(openCountModal));
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
