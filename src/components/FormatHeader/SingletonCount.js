/* eslint-disable max-depth */
import React, { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import useCards from '@hooks/useCards';
import useFormat from '@hooks/useFormat';
import useCommander from '@hooks/useCommander';
import useOathbreaker from '@hooks/useOathbreaker';
import getAverageCmc from '@utils/getAverageCmc';
import {
	IS_IN_DECK,
	COMMANDER,
	OATHBREAKER,
} from '@constants';
import { cardCount } from './styles.scss';

const formatCounts = {
	[COMMANDER]: 100,
};
const DEFAULT_COUNT = 60;
const CMC = 'CMC: ';

const useCommandZoneCards = (format) => {
	const { commander, partner } = useCommander();
	const { oathbreaker, signatureSpell } = useOathbreaker();
	// eslint-disable-next-line max-statements, complexity
	const commandZoneCount = useMemo(() => {
		let result = 0;

		if (format === COMMANDER) {
			if (!isEmpty(commander))
				result += 1;
			if (!isEmpty(partner))
				result += 1;
		}
		if (format === OATHBREAKER) {
			if (!isEmpty(oathbreaker))
				result += 1;
			if (!isEmpty(signatureSpell))
				result += 1;
		}
		return result;
	},
	[format, commander, partner, oathbreaker, signatureSpell]);

	return commandZoneCount;
};

const calculateCardCount = (cardsInDeck = [], commandZoneCount = 0) => {
	let result = commandZoneCount;

	cardsInDeck.forEach((card) => {
		result += (card.count || 1);
	});
	return result;
};

// eslint-disable-next-line max-statements
const SingletonCount = () => {
	const { cardsByAttribute } = useCards();
	const { format } = useFormat();
	const commandZoneCount = useCommandZoneCards(format);
	const OUT_OF_X = useMemo(() => `/${formatCounts[format] || DEFAULT_COUNT}`, [format]);
	const count = useMemo(() => calculateCardCount(cardsByAttribute(IS_IN_DECK), commandZoneCount),
		[cardsByAttribute, commandZoneCount]);
	const cmc = getAverageCmc(cardsByAttribute(IS_IN_DECK)).toPrecision(3);

	return (
		<div className={cardCount}>
			<span>
				{count}
				{OUT_OF_X}
			</span>
			<span>
				{CMC}
				{cmc}
			</span>
		</div>
	);
};

export default SingletonCount;