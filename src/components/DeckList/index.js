import React from 'react';
import CardList from '@components/CardList';
import Divider from './Divider';
import useImport from './useImport';
import useDecklist from './useDecklist';
import useExport from './useExport';
import { deckList, buttonContainer, importButton } from './styles.scss';

const IMPORT = 'Import Clipboard';
const EXPORT = 'Export to Clipboard';
const MAINBOARD = 'Main Deck';
const SIDEBOARD = 'Sideboard';

const DeckList = () => {
	const importFile = useImport();
	const { maindeck, sideboard } = useDecklist();
	const exportFile = useExport(maindeck, sideboard);

	return (
		<>
			<div className={deckList}>
				<Divider label={MAINBOARD} />
				<CardList alwaysColorful cards={maindeck} />
				<Divider label={SIDEBOARD} />
				<CardList alwaysColorful cards={sideboard} />
			</div>
			<div className={buttonContainer}>
				<button className={importButton} onClick={importFile} type="button">{IMPORT}</button>
				<button className={importButton} onClick={exportFile} type="button">{EXPORT}</button>
			</div>
		</>
	);
};

export default DeckList;
