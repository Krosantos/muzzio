import fs from 'fs';
import get from 'lodash/get';
import set from 'lodash/set';
import { useCallback } from 'react';
import { remote } from 'electron';
import useCards from '@hooks/useCards';
import { IS_IN_DECK } from '@constants';
import lookUpCards from './lookUpCards';

const { dialog } = remote;

const useImport = () => {
	const { addCard, clearDeck } = useCards();
	const importFile = useCallback(async () => {
		const paths = dialog.showOpenDialog({
			filters: [
				{ extensions: ['txt'], name: 'Text Files' },
				{ extensions: ['muz'], name: 'Deck Files' },
				{ extensions: ['*'], name: 'All Files' },
			],
			properties: ['openFile'],
		});
		const path = get(paths, 0);

		if (!path)
			return;
		const raw = fs.readFileSync(path, 'utf8');

		clearDeck();
		const newDeck = await lookUpCards(raw);

		newDeck.forEach((card) => {
			const toSet = { ...card };

			set(toSet, ['attributes', IS_IN_DECK], true);
			addCard(toSet);
		});
	});

	return importFile;
};

export default useImport;
