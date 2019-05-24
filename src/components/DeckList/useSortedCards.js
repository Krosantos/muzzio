/* eslint-disable max-depth */
import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { IS_IN_DECK, OATHBREAKER, COMMANDER } from '@constants';
import useCards from '@hooks/useCards';
import useBasicLands from '@hooks/useBasicLands';
import useCommander from '@hooks/useCommander';
import useFormat from '@hooks/useFormat';
import useOathbreaker from '@hooks/useOathbreaker';

const sortCards = (cards, basicLands) => {
	const byAlpha = sortBy(cards, ({ name }) => name);
	const byCmc = sortBy(byAlpha, ({ cmc }) => cmc);
	const byNotLand = sortBy(byCmc, ({ type }) => type.includes('Land'));
	const withBasics = byNotLand.concat(basicLands);

	return withBasics;
};

// eslint-disable-next-line max-params, complexity, max-statements
const appendCards = (sortedCards, format, commanderData, oathbreakerData) => {
	const { commander, partner } = commanderData;
	const { oathbreaker, signatureSpell } = oathbreakerData;

	if (format === COMMANDER) {
		if (!isEmpty(commander))
			sortedCards.push(commander);
		if (!isEmpty(partner))
			sortedCards.push(partner);
	}
	if (format === OATHBREAKER) {
		if (!isEmpty(oathbreaker))
			sortedCards.push(oathbreaker);
		if (!isEmpty(signatureSpell))
			sortedCards.push(signatureSpell);
	}

	return sortedCards;
};

// eslint-disable-next-line max-statements
const useSortedCards = () => {
	const { cardsByAttribute } = useCards();
	const cardsInDeck = useMemo(() => cardsByAttribute(IS_IN_DECK), [cardsByAttribute]);
	const commanderData = useCommander();
	const oathbreakerData = useOathbreaker();
	const { format } = useFormat();
	const { asCards: basicLands } = useBasicLands();
	const sortedCards = useMemo(() => sortCards(cardsInDeck, basicLands), [cardsInDeck, basicLands]);

	return appendCards(sortedCards, format, commanderData, oathbreakerData);
};

export default useSortedCards;
