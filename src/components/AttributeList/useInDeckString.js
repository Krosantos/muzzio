import { useMemo } from 'react';
import filter from 'lodash/filter';
import useFormat from '@hooks/useFormat';
import useCards from '@hooks/useCards';
import { ALL_CARDS } from '@constants';

const getAllCardsString = (isSingleton, cards) => {
	if (!isSingleton)
		return '';
	return ` - ${Object.keys(cards).length}`;
};

const getSingletonString = (cards = []) => {
	const inDeck = filter(cards, (card) => card.count >= 1).length;
	const inTotal = cards.length;

	return ` - ${inDeck} of ${inTotal}`;
};

const getNonSingletonString = (cards) => {
	const inDeck = filter(cards, (card) => card.count >= 1);
	const inSideboard = filter(cards, (card) => card.sideboardCount >= 1);

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
	}, [attribute, isSingleton, cards, cardsByAttribute]);

	return inDeckString;
};

export default useInDeckString;
