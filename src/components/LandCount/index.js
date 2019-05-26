import React, { useMemo } from 'react';
import { IS_IN_DECK } from '@constants';
import useCards from '@hooks/useCards';
import useBasicLands from '@hooks/useBasicLands';
import { countContainer } from './styles.scss';

const LANDS = 'Lands: ';

const getLandCount = (cardsByAttribute, totalCount) => {
	const cardsInDeck = cardsByAttribute(IS_IN_DECK);
	const landsInDeck = cardsInDeck.filter(({ type }) => type.includes('Land'));

	return landsInDeck.length + totalCount;
};

const LandCount = () => {
	const { cardsByAttribute } = useCards();
	const { totalCount } = useBasicLands();
	const landCount = useMemo(() => getLandCount(cardsByAttribute, totalCount), [cardsByAttribute, totalCount]);

	return (
		<div className={countContainer}>
			{LANDS}
			{landCount}
		</div>
	);
};

export default LandCount;
