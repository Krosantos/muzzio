import React, { useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import CardList from '@components/CardList';
import { IS_IN_DECK } from '@constants';
import useCards from '@hooks/useCards';
import useBasicLands from '@hooks/useBasicLands';
import useCommander from '@hooks/useCommander';
import useImport from '@hooks/useImport';
import { deckList, buttonContainer, importButton } from './styles.scss';

const IMPORT = 'Import Deck';
const EXPORT = 'Export Deck';

const sortCards = (cards, commander, partner, basicLands) => {
	const byAlpha = sortBy(cards, ({ name }) => name);
	const byCmc = sortBy(byAlpha, ({ cmc }) => cmc);
	const byNotLand = sortBy(byCmc, ({ type }) => type.includes('Land'));
	const withBasics = byNotLand.concat(basicLands);

	if (!isEmpty(commander))
		withBasics.push(commander);
	if (!isEmpty(partner))
		withBasics.push(partner);
	return withBasics;
};

const DeckList = () => {
	const { cards, cardsByAttribute } = useCards();
	const importFile = useImport();
	const cardsInDeck = useMemo(() => cardsByAttribute(IS_IN_DECK), [cards]);
	const { commander, partner } = useCommander();
	const { asCards: basicLands } = useBasicLands();

	const sortedCards = useMemo(() => sortCards(cardsInDeck, commander, partner, basicLands), [cardsInDeck]);

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
