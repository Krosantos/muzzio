import React, { useMemo } from 'react';
import CardList from '@components/CardList';
import { IS_IN_DECK } from '@constants';
import useCards from '@hooks/useCards';
import useImport from '@hooks/useImport';
import { deckList, buttonContainer, importButton } from './styles.scss';

const IMPORT = 'Import Deck';
const EXPORT = 'Export Deck';

const DeckList = () => {
	const { cards, cardsByAttribute } = useCards();
	const importFile = useImport();
	const cardsInDeck = useMemo(() => cardsByAttribute(IS_IN_DECK), [cards]);

	return (
		<>
			<div className={deckList}>
				<CardList cards={cardsInDeck} />
			</div>
			<div className={buttonContainer}>
				<button className={importButton} onClick={importFile} type="button">{IMPORT}</button>
				<button className={importButton} type="button">{EXPORT}</button>
			</div>
		</>
	);
};

export default DeckList;
