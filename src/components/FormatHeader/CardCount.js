import React, { useMemo } from 'react';
import useCards from '@hooks/useCards';
import useBasicLands from '@hooks/useBasicLands';
import useFormat from '@hooks/useFormat';
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
	[COMMANDER]: 99,
	[MODERN]: 60,
	[OATHBREAKER]: 58,
	[STANDARD]: 60,
};
const CMC = 'CMC: ';

// eslint-disable-next-line max-statements
const CardCount = () => {
	const { cardsByAttribute } = useCards();
	const { totalCount: basicCount } = useBasicLands('');
	const cardsInDeck = cardsByAttribute(IS_IN_DECK);
	const count = cardsInDeck.length + basicCount;
	const cmc = getAverageCmc(cardsInDeck).toPrecision(3);
	const { format } = useFormat();
	const OUT_OF_X = useMemo(() => `/${formatCounts[format]}`, [format]);

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
