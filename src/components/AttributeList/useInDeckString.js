import { useMemo } from 'react';
import get from 'lodash/get';
import filter from 'lodash/filter';
import useFormat from '@hooks/useFormat';
import useCards from '@hooks/useCards';
import {
	ALL_CARDS,
	IS_IN_DECK,
	IS_IN_SIDEBOARD,
} from '@constants';

const filterCards = (cards, attribute) => filter(cards, (card) => get(card, ['attributes', attribute], false));

const getAllCardsString = (isSingleton, cards) => {
	if (!isSingleton)
		return '';
	return ` - ${Object.keys(cards).length}`;
};

const getSingletonString = (cards = []) => {
	const inDeck = filterCards(cards, IS_IN_DECK).length;
	const inTotal = cards.length;

	return ` - ${inDeck} of ${inTotal}`;
};

// eslint-disable-next-line max-statements
const getNonSingletonString = (cards) => {
	const inDeck = filterCards(cards, IS_IN_DECK);
	const inSideboard = filterCards(cards, IS_IN_SIDEBOARD);

	const inDeckCount = inDeck.reduce((prev, curr) => prev + (curr.count || 0), 0);
	const inSideboardCount = inSideboard.reduce((prev, curr) => prev + (curr.sideboardCount || 0), 0);

	let result = ` - ${inDeckCount}`;

	if (inSideboard < 1)
		return result;
	result += `/(${inSideboardCount})`;
	return result;
};

const useInDeckString = (attribute) => {
	const { isSingleton } = useFormat();
	const { cards, cardsByAttribute } = useCards();

	const inDeckString = useMemo(() => {
		if (attribute === ALL_CARDS)
			return getAllCardsString(isSingleton, cards);
		const cardsWithAttribute = cardsByAttribute(attribute);

		if (isSingleton)
			return getSingletonString(cardsWithAttribute);
		return getNonSingletonString(cardsWithAttribute);
	}, [attribute, isSingleton, cardsByAttribute]);

	return inDeckString;
};

export default useInDeckString;
