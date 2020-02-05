import React, { useMemo } from 'react';
import useCards from '@hooks/useCards';
import { cardCount } from './styles.scss';

const MAIN_COUNT = '/60';
const SIDE_COUNT = '/15';

const calculateCardCount = (cards = []) => {
	let result = 0;

	cards.forEach((card) => {
		result += (card.count || 1);
	});
	return result;
};

const calculateSideboardCount = (cards = []) => {
	let result = 0;

	cards.forEach((card) => {
		result += (card.sideboardCount || 1);
	});
	return result;
};

const CardCount = () => {
	const { cardsInDeck, cardsInSideboard } = useCards();
	const mainCount = useMemo(() => calculateCardCount(
		cardsInDeck(),
	),	[cardsInDeck]);
	const sideCount = useMemo(() => calculateSideboardCount(
		cardsInSideboard(),
	), [cardsInSideboard]);

	return (
		<div className={cardCount}>
			<span>
				{mainCount}
				{MAIN_COUNT}
			</span>
			<span>
				{sideCount}
				{SIDE_COUNT}
			</span>
		</div>
	);
};

export default CardCount;
