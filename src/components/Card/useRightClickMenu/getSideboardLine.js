import { remote } from 'electron';
import { CARD_MAX } from '@constants';

const { MenuItem } = remote;

const generateUnlimitedMenu = (openSideboardCountModal) => new MenuItem({
	click: openSideboardCountModal,
	label: 'Set Sideboard Count',
});

const generateSubmenu = (card, setSideboardCount) => {
	const submenu = [];

	for (let x = 0; x <= CARD_MAX; x += 1) {
		submenu.push({
			click: () => setSideboardCount(card, x),
			label: `Set sideboard count to ${x}`,
		});
	}
	return submenu;
};

// eslint-disable-next-line max-params
const getSideboardLine = (isSingleton, card, menu, setSideboardCount, openSideboardCountModal) => {
	const { isUnlimited = false } = card;

	if (isSingleton && !isUnlimited)
		return;

	if (isUnlimited) {
		menu.append(generateUnlimitedMenu(openSideboardCountModal));
	} else {
		menu.append(
			new MenuItem({
				label: 'Set Sideboard Count',
				submenu: generateSubmenu(card, setSideboardCount),
			}),
		);
	}
};

export default getSideboardLine;
