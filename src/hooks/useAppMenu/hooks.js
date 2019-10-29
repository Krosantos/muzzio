import path from 'path';
import { useCallback } from 'react';
import { remote } from 'electron';
import settings from 'electron-settings';
import getList from '@api/getList';
import useSave from '@hooks/useSave';
import useLoad from '@hooks/useLoad';
import useFormat from '@hooks/useFormat';
import useOverwrite from '@hooks/useOverwrite';
import useCards from '@hooks/useCards';
import setWindowTitle from '@utils/setWindowTitle';
import { CURRENT_FILE_SETTING, OPEN_FOLDER_SETTING } from '@constants';

const { app, dialog } = remote;

const useSaveDeck = (saveAs = false) => {
	const save = useSave();
	const saveDeck = useCallback(() => {
		const needsChoosing = saveAs || !settings.has(CURRENT_FILE_SETTING);
		const filepath = needsChoosing ? dialog.showSaveDialog({
			defaultPath: app.getPath('documents'),
			filters: [
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		}) : settings.get(CURRENT_FILE_SETTING);

		save(filepath);
		setWindowTitle(filepath);
		settings.set(CURRENT_FILE_SETTING, filepath);
	}, [save, saveAs]);

	return saveDeck;
};

const useLoadDeck = () => {
	const load = useLoad();
	const overwrite = useOverwrite();
	const loadDeck = useCallback(() => {
		const openPath = settings.get(OPEN_FOLDER_SETTING) || app.getPath('documents');
		const [filepath] = dialog.showOpenDialog({
			defaultPath: openPath,
			filters: [
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		});
		const saveData = load(filepath);

		overwrite(saveData);
		setWindowTitle(filepath);
		settings.set(CURRENT_FILE_SETTING, filepath);
		settings.set(OPEN_FOLDER_SETTING, path.dirname(filepath));
	}, [load, overwrite]);

	return loadDeck;
};

const useNewDeck = () => {
	const overwrite = useOverwrite();
	const { format } = useFormat();
	const newDeck = useCallback(() => {
		setWindowTitle();
		settings.delete(CURRENT_FILE_SETTING);
		overwrite({ format });
	}, [format, overwrite]);

	return newDeck;
};

const useChangeFormat = () => {
	const overwrite = useOverwrite();
	const changeFormat = useCallback((format) => () => {
		setWindowTitle();
		settings.delete(CURRENT_FILE_SETTING);
		overwrite({ format });
	}, [overwrite]);

	return changeFormat;
};

const useRefreshCards = () => {
	const { cards, addCard } = useCards();

	const refreshCards = useCallback(async () => {
		const identifiers = Object.keys(cards).map((id) => ({ id }));
		const newCards = await getList(identifiers);

		newCards.forEach((card) => addCard(card));
	}, [addCard, cards]);

	return refreshCards;
};

export {
	useSaveDeck,
	useLoadDeck,
	useNewDeck,
	useChangeFormat,
	useRefreshCards,
};
