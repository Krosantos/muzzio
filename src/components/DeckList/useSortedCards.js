import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { IS_IN_DECK } from '@constants';
import useCards from '@hooks/useCards';
import useBasicLands from '@hooks/useBasicLands';
import useCommander from '@hooks/useCommander';

// eslint-disable-next-line max-params
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

const useSortedCards = () => {
	const { cardsByAttribute } = useCards();
	const cardsInDeck = useMemo(() => cardsByAttribute(IS_IN_DECK), [cardsByAttribute]);
	const { commander, partner } = useCommander();
	const { asCards: basicLands } = useBasicLands();
	const sortedCards = useMemo(() => sortCards(cardsInDeck, commander, partner, basicLands),
		[cardsInDeck, commander, partner, basicLands]);

	return sortedCards;
};

export default useSortedCards;
