import React from 'react';
import CardList from '@components/CardList';
import useImport from '@hooks/useImport';
import useSortedCards from './useSortedCards';
import { deckList, buttonContainer, importButton } from './styles.scss';

const IMPORT = 'Import Deck';
const EXPORT = 'Export Deck';

const DeckList = () => {
	const importFile = useImport();
	const sortedCards = useSortedCards();

	return (
		<>
			<div className={deckList}>
				<CardList alwaysColorful cards={sortedCards} />
			</div>
			<div className={buttonContainer}>
				<button className={importButton} onClick={importFile} type="button">{IMPORT}</button>
				<button className={importButton} type="button">{EXPORT}</button>
			</div>
		</>
	);
};

export default DeckList;
