import React, { useMemo } from 'react';
import useCards from '@hooks/useCards';
import { IS_IN_DECK } from '@constants';
import { countContainer } from './styles.scss';

const LANDS = 'Lands: ';

const getLandCount = (cardsByAttribute) => {
	const cardsInDeck = cardsByAttribute(IS_IN_DECK);
	const landsInDeck = cardsInDeck.filter(({ type }) => type.includes('Land'));

	let count = 0;

	landsInDeck.forEach((card) => {
		count += (card.count || 1);
	});
	return count;
};

const LandCount = () => {
	const { cardsByAttribute } = useCards();
	const landCount = useMemo(() => getLandCount(cardsByAttribute), [cardsByAttribute]);

	return (
		<div className={countContainer}>
			{LANDS}
			{landCount}
		</div>
	);
};

export default LandCount;
