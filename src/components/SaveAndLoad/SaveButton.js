import React, { useCallback } from 'react';
import { remote } from 'electron';
import useSave from '@hooks/useSave';
import { saveLoadButton } from './styles.scss';

const SAVE = 'Save';
const { app, dialog } = remote;

const SaveButton = () => {
	const save = useSave();
	const saveDeck = useCallback((event) => {
		const path = dialog.showSaveDialog({
			defaultPath: app.getPath('documents'),
			filters: [
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		});

		event.preventDefault();
		save(path);
	}, [save]);

	return (
		<button
			className={saveLoadButton}
			onClick={saveDeck}
			type="button"
		>
			{SAVE}
		</button>
	);
};

export default SaveButton;
