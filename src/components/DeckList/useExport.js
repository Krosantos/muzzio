import fs from 'fs';
import { useCallback, useMemo } from 'react';
import { remote } from 'electron';

const { app, dialog } = remote;
const STARTS_WITH_NUMBER = /^\d/;

const formatCards = (cards) => {
	const names = cards.map(({ name }) => {
		if (!name.match(STARTS_WITH_NUMBER))
			return `1 ${name}`;
		return name;
	});

	return names.join('\r\n');
};

const useExport = (cards = []) => {
	const toWrite = useMemo(() => formatCards(cards), [cards]);
	const exportList = useCallback(async () => {
		const path = dialog.showSaveDialog({
			defaultPath: app.getPath('documents'),
			filters: [
				{ extensions: ['txt'], name: 'Text Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
		});

		fs.writeFileSync(path, toWrite);
	});

	return exportList;
};

export default useExport;
