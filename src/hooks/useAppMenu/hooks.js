import { useCallback } from 'react';
import { remote } from 'electron';
import settings from 'electron-settings';
import useSave from '@hooks/useSave';
import useLoad from '@hooks/useLoad';
import useFormat from '@hooks/useFormat';
import useOverwrite from '@hooks/useOverwrite';
import setWindowTitle from '@utils/setWindowTitle';
import { CURRENT_FILE_SETTING } from '@constants';

const { app, dialog } = remote;

const useSaveDeck = (saveAs = false) => {
	const save = useSave();
	const saveDeck = useCallback(() => {
		const needsChoosing = saveAs && !settings.has(CURRENT_FILE_SETTING);
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
	}, [save]);

	return saveDeck;
};

const useLoadDeck = () => {
	const load = useLoad();
	const overwrite = useOverwrite();
	const loadDeck = useCallback(() => {
		const [filepath] = dialog.showOpenDialog({
			defaultPath: app.getPath('documents'),
			filters: [
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		});

		const saveData = load(filepath);

		overwrite(saveData);
		setWindowTitle(filepath);
		settings.set(CURRENT_FILE_SETTING, filepath);
	}, [load]);

	return loadDeck;
};

const useNewDeck = () => {
	const overwrite = useOverwrite();
	const { format } = useFormat();
	const newDeck = useCallback(() => {
		overwrite({ format });
		setWindowTitle();
		settings.delete(CURRENT_FILE_SETTING);
	}, [format]);

	return newDeck;
};

const useChangeFormat = () => {
	const { setFormat } = useFormat();
	const changeFormat = useCallback((format) => () => {
		setFormat(format);
	}, [setFormat]);

	return changeFormat;
};

export {
	useSaveDeck,
	useLoadDeck,
	useNewDeck,
	useChangeFormat,
};
