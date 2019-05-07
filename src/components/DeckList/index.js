import React, { useMemo } from 'react';
import useCards from '@hooks/useCards';
import CardList from '@components/CardList';
import { IS_IN_DECK } from '@constants';
import { deckList } from './styles.scss';

const DeckList = () => {
	const { cards, cardsByAttribute } = useCards();
	const cardsInDeck = useMemo(() => cardsByAttribute(IS_IN_DECK), [cards]);

	return (
		<div className={deckList}>
			<CardList cards={cardsInDeck} />
		</div>
	);
};

export default DeckList;
