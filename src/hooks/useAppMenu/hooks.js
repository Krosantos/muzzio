import path from 'path';
import { useCallback } from 'react';
import { remote } from 'electron';
import useSave from '@hooks/useSave';
import useLoad from '@hooks/useLoad';
import useFormat from '@hooks/useFormat';
import useOverwrite from '@hooks/useOverwrite';

const { app, dialog } = remote;

const setWindowTitle = (filepath) => {
	if (!filepath)
		document.title = 'Muzzio';

	const name = path.basename(filepath, '.muz');

	document.title = `Muzzio - ${name}`;
};

const useSaveDeck = (saveAs = false) => {
	const save = useSave();
	const saveDeck = useCallback(() => {
		const filepath = saveAs ? dialog.showSaveDialog({
			defaultPath: app.getPath('documents'),
			filters: [
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		}) : 'CURRENTFILE FROM SETTINGS';

		save(filepath);
		setWindowTitle(filepath);
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

		setWindowTitle(filepath);
		overwrite(saveData);
	}, [load]);

	return loadDeck;
};

const useNewDeck = () => {
	const overwrite = useOverwrite();
	const { format } = useFormat();
	const newDeck = useCallback(() => {
		overwrite({ format });
		setWindowTitle();
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
