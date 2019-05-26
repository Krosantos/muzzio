import { useCallback } from 'react';
import { remote } from 'electron';
import useSave from '@hooks/useSave';
import useLoad from '@hooks/useLoad';
import useFormat from '@hooks/useFormat';
import useOverwrite from '@hooks/useOverwrite';

const { app, dialog } = remote;

const useSaveDeck = (saveAs = false) => {
	const save = useSave();
	const saveDeck = useCallback(() => {
		const path = saveAs ? dialog.showSaveDialog({
			defaultPath: app.getPath('documents'),
			filters: [
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		}) : 'CURRENTFILE FROM SETTINGS';

		save(path);
	}, [save]);

	return saveDeck;
};

const useLoadDeck = () => {
	const load = useLoad();
	const overwrite = useOverwrite();
	const loadDeck = useCallback(() => {
		const [path] = dialog.showOpenDialog({
			defaultPath: app.getPath('documents'),
			filters: [
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		});

		const saveData = load(path);

		overwrite(saveData);
	}, [load]);

	return loadDeck;
};

const useNewDeck = () => {
	const overwrite = useOverwrite();
	const { format } = useFormat();
	const newDeck = useCallback(() => {
		overwrite({ format });
	}, [format]);

	return newDeck;
};

export {
	useSaveDeck,
	useLoadDeck,
	useNewDeck,
};
