/* eslint-disable max-depth */
import React, { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import useCards from '@hooks/useCards';
import useBasicLands from '@hooks/useBasicLands';
import useFormat from '@hooks/useFormat';
import useCommander from '@hooks/useCommander';
import useOathbreaker from '@hooks/useOathbreaker';
import getAverageCmc from '@utils/getAverageCmc';
import {
	IS_IN_DECK,
	MODERN,
	COMMANDER,
	OATHBREAKER,
	STANDARD,
} from '@constants';
import { cardCount } from './styles.scss';

const formatCounts = {
	[COMMANDER]: 100,
	[MODERN]: 60,
	[OATHBREAKER]: 60,
	[STANDARD]: 60,
};
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

// eslint-disable-next-line max-statements
const CardCount = () => {
	const { cardsByAttribute } = useCards();
	const { totalCount: basicCount } = useBasicLands('');
	const { format } = useFormat();
	const commandZoneCount = useCommandZoneCards(format);
	const OUT_OF_X = useMemo(() => `/${formatCounts[format]}`, [format]);
	const count = useMemo(() => cardsByAttribute(IS_IN_DECK).length + basicCount + commandZoneCount,
		[cardsByAttribute, basicCount, commandZoneCount]);
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

export default CardCount;
