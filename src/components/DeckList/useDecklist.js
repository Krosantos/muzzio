/* eslint-disable max-depth */
import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import {
	IS_IN_DECK,
	IS_IN_SIDEBOARD,
	OATHBREAKER,
	COMMANDER,
} from '@constants';
import useCards from '@hooks/useCards';
import useCommander from '@hooks/useCommander';
import useFormat from '@hooks/useFormat';
import useOathbreaker from '@hooks/useOathbreaker';

const sortCards = (cards) => {
	const byAlpha = sortBy(cards, ({ name }) => name);
	const byCmc = sortBy(byAlpha, ({ cmc }) => cmc);
	const byNotLand = sortBy(byCmc, ({ type }) => type.includes('Land'));
	const byNotBasicLand = sortBy(byNotLand, ({ type }) => type.includes('Basic'));

	return byNotBasicLand;
};

// eslint-disable-next-line max-params, complexity, max-statements
const appendCards = (sortedCards, format, commanderData, oathbreakerData) => {
	const cards = [...sortedCards];
	const { commander, partner } = commanderData;
	const { oathbreaker, signatureSpell } = oathbreakerData;

	if (format === COMMANDER) {
		if (!isEmpty(commander))
			cards.push(commander);
		if (!isEmpty(partner))
			cards.push(partner);
	}
	if (format === OATHBREAKER) {
		if (!isEmpty(oathbreaker))
			cards.push(oathbreaker);
		if (!isEmpty(signatureSpell))
			cards.push(signatureSpell);
	}

	return cards;
};

// eslint-disable-next-line max-statements
const useMaindeck = () => {
	const { cardsByAttribute } = useCards();
	const cardsInDeck = useMemo(() => cardsByAttribute(IS_IN_DECK), [cardsByAttribute]);
	const commanderData = useCommander();
	const oathbreakerData = useOathbreaker();
	const { format } = useFormat();
	const sortedCards = useMemo(() => sortCards(cardsInDeck), [cardsInDeck]);

	return appendCards(sortedCards, format, commanderData, oathbreakerData);
};

const useSideboard = () => {
	const { cardsByAttribute } = useCards();
	const cardsInSideboard = useMemo(() => cardsByAttribute(IS_IN_SIDEBOARD), [cardsByAttribute]);
	const sortedCards = useMemo(() => sortCards(cardsInSideboard), [cardsInSideboard]);

	return sortedCards;
};

const useDecklist = () => {
	const maindeck = useMaindeck();
	const sideboard = useSideboard();

	return {
		maindeck,
		sideboard,
	};
};

export default useDecklist;
