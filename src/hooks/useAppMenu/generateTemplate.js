import { remote } from 'electron';
import {
	COMMANDER,
	OATHBREAKER,
} from '@constants';

const { app } = remote;
const isMac = process.platform === 'darwin';

const macMenu = {
	label: app.getName(),
	submenu: [
		{ role: 'about' },
		{ type: 'separator' },
		{ role: 'hide' },
		{ role: 'hideothers' },
		{ role: 'unhide' },
		{ type: 'separator' },
		{ role: 'quit' },
	],
};

const viewMenu = {
	label: 'View',
	submenu: [
		{ role: 'reload' },
		process.env.FROM_LOCAL
			? { role: 'toggledevtools' }
			: { type: 'separator' },
		{ role: 'resetzoom' },
		{ accelerator: 'CommandOrControl+=', role: 'zoomin' },
		{ role: 'zoomout' },
		{ type: 'separator' },
		{ role: 'togglefullscreen' },
	],
};

const getFileMenu = ({
	changeFormat,
	newDeck,
	loadDeck,
	saveDeck,
	saveDeckAs,
}) => ({
	label: 'File',
	submenu: [
		{ accelerator: 'CommandOrControl+N', click: newDeck, label: 'New Deck' },
		{ accelerator: 'CommandOrControl+O', click: loadDeck, label: 'Open Deck' },
		{ type: 'separator' },
		{
			label: 'Change Format',
			submenu: [
				{ click: changeFormat(COMMANDER), label: 'Commander' },
				{ click: changeFormat(OATHBREAKER), label: 'Oathbreaker' },
			],
		},
		{ type: 'separator' },
		{ accelerator: 'CommandOrControl+S', click: saveDeck, label: 'Save Deck' },
		{ accelerator: 'CommandOrControl+Shift+S', click: saveDeckAs, label: 'Save As' },
		{ type: 'separator' },
		isMac ? { role: 'close' } : { role: 'quit' },
	],
});

const windowMenu = {
	label: 'Window',
	submenu: [
		{ role: 'minimize' },
		...(isMac ? [
			{ type: 'separator' },
			{ role: 'front' },
			{ type: 'separator' },
			{ role: 'window' },
		] : [
			{ role: 'close' },
		]),
	],
};

const generateTemplate = (callbacks) => {
	const template = [];

	if (isMac)
		template.unshift(macMenu);
	template.push(getFileMenu(callbacks));
	template.push(viewMenu);
	template.push(windowMenu);
	return template;
};

export default generateTemplate;
