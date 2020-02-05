import { useCallback } from 'react';
import { remote } from 'electron';
import useCards from '@hooks/useCards';
import useFormat from '@hooks/useFormat';
import lookUpCards from './lookUpCards';

const { clipboard } = remote;

const useImport = () => {
	const { addCard, clearDeck } = useCards();
	const { isSingleton } = useFormat();
	const importFile = useCallback(async () => {
		const raw = clipboard.readText();

		clearDeck();
		const newDeck = await lookUpCards(raw, isSingleton);

		newDeck.forEach((card) => {
			addCard({ ...card });
		});
	}, [addCard, clearDeck, isSingleton]);

	return importFile;
};

export default useImport;
