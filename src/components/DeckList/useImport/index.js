import set from 'lodash/set';
import { useCallback } from 'react';
import { remote } from 'electron';
import useCards from '@hooks/useCards';
import { IS_IN_DECK } from '@constants';
import lookUpCards from './lookUpCards';

const { clipboard } = remote;

const useImport = () => {
	const { addCard, clearDeck } = useCards();
	const importFile = useCallback(async () => {
		const raw = clipboard.readText();

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
