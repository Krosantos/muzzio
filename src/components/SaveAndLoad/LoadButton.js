import React, { useCallback } from 'react';
import { remote } from 'electron';
import useLoad from '@hooks/useLoad';
import useOverwrite from '@hooks/useOverwrite';
import { saveLoadButton } from './styles.scss';

const LOAD = 'Load';
const { app, dialog } = remote;

const LoadButton = () => {
	const load = useLoad();
	const overwrite = useOverwrite();
	const loadDeck = useCallback((event) => {
		const [path] = dialog.showOpenDialog({
			defaultPath: app.getPath('documents'),
			filters: [
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		});

		event.preventDefault();
		const saveData = load(path);

		overwrite(saveData);
	}, [load]);

	return (
		<button
			className={saveLoadButton}
			onClick={loadDeck}
			type="button"
		>
			{LOAD}
		</button>
	);
};

export default LoadButton;
