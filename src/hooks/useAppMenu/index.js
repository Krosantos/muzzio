import { useEffect } from 'react';
import { remote } from 'electron';
import generateTemplate from './generateTemplate';

const { Menu } = remote;

const useAppMenu = () => {
	useEffect(() => {
		const template = generateTemplate();
		const menu = Menu.buildFromTemplate(template);

		Menu.setApplicationMenu(menu);
	});
};

export default useAppMenu;
