import { remote } from 'electron';

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
		{ type: 'separator' },
		{ role: 'resetzoom' },
		{ accelerator: 'CommandOrControl+=', role: 'zoomin' },
		{ role: 'zoomout' },
		{ type: 'separator' },
		{ role: 'togglefullscreen' },
	],
};

const fileMenu = {
	label: 'File',
	submenu: [
		{ accelerator: 'CommandOrControl+N', label: 'New Deck' },
		{ accelerator: 'CommandOrControl+O', label: 'Open Deck' },
		{ type: 'separator' },
		{
			label: 'Change Format',
			submenu: [
				{ label: 'Commander' },
				{ label: 'Oathbreaker' },
			],
		},
		{ type: 'separator' },
		{ accelerator: 'CommandOrControl+S', label: 'Save Deck' },
		{ accelerator: 'CommandOrControl+Shift+S', label: 'Save As' },
		{ type: 'separator' },
		isMac ? { role: 'close' } : { role: 'quit' },
	],
};

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

const generateTemplate = () => {
	const template = [];

	if (isMac)
		template.unshift(macMenu);
	template.push(fileMenu);
	template.push(viewMenu);
	template.push(windowMenu);
	return template;
};

export default generateTemplate;
