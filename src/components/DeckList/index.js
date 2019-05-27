import React from 'react';
import CardList from '@components/CardList';
import useImport from './useImport';
import useSortedCards from './useSortedCards';
import useExport from './useExport';
import { deckList, buttonContainer, importButton } from './styles.scss';

const IMPORT = 'Import Clipboard';
const EXPORT = 'Export to Clipboard';

const DeckList = () => {
	const importFile = useImport();
	const sortedCards = useSortedCards();
	const exportFile = useExport(sortedCards);

	return (
		<>
			<div className={deckList}>
				<CardList alwaysColorful cards={sortedCards} />
			</div>
			<div className={buttonContainer}>
				<button className={importButton} onClick={importFile} type="button">{IMPORT}</button>
				<button className={importButton} onClick={exportFile} type="button">{EXPORT}</button>
			</div>
		</>
	);
};

export default DeckList;
