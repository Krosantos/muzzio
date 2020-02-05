import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import useCards from '@hooks/useCards';
import useCommander from '@hooks/useCommander';
import useFormat from '@hooks/useFormat';
import useOathbreaker from '@hooks/useOathbreaker';
import {
	OATHBREAKER,
	COMMANDER,
} from '@constants';

const sortCards = (cards) => {
	const byAlpha = sortBy(cards, ({ name }) => name);
	const byCmc = sortBy(byAlpha, ({ cmc }) => cmc);
	const byNotLand = sortBy(byCmc, ({ type }) => type.includes('Land'));
	const byNotBasicLand = sortBy(byNotLand, ({ type }) => type.includes('Basic'));

	return byNotBasicLand;
};

const getMaindeckCount = (cards) => cards.map((card) => ({ ...card, sideboardCount: 0 }));

const getSideboardCount = (cards) => cards.map((card) => {
	const { sideboardCount = 0 } = card;

	return { ...card, count: sideboardCount, sideboardCount: 0 };
});

// eslint-disable-next-line max-params, complexity
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

const useMaindeck = () => {
	const { cardsInDeck } = useCards();
	const commanderData = useCommander();
	const oathbreakerData = useOathbreaker();
	const { format } = useFormat();
	const sortedCards = useMemo(() => sortCards(cardsInDeck()), [cardsInDeck]);
	const mainCounted = getMaindeckCount(sortedCards);

	return appendCards(mainCounted, format, commanderData, oathbreakerData);
};

const useSideboard = () => {
	const { cardsInSideboard } = useCards();
	const countedAndSorted = useMemo(() => {
		const sorted = sortCards(cardsInSideboard());

		return getSideboardCount(sorted);
	}, [cardsInSideboard]);

	return countedAndSorted;
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
