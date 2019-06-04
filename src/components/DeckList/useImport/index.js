import set from 'lodash/set';
import { useCallback } from 'react';
import { remote } from 'electron';
import useCards from '@hooks/useCards';
import { IS_IN_DECK, IS_IN_SIDEBOARD } from '@constants';
import lookUpCards from './lookUpCards';

const { clipboard } = remote;

const useImport = () => {
	const { addCard, clearDeck } = useCards();
	const importFile = useCallback(async () => {
		const raw = clipboard.readText();

		clearDeck();
		const newDeck = await lookUpCards(raw);

		newDeck.forEach((card) => {
			const { count, sideboardCount } = card;
			const toSet = { ...card };

			if (count > 0)
				set(toSet, ['attributes', IS_IN_DECK], true);
			if (sideboardCount > 0)
				set(toSet, ['attributes', IS_IN_SIDEBOARD], true);
			addCard(toSet);
		});
	});

	return importFile;
};

export default useImport;
