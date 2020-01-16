import React, { useMemo } from 'react';
import useCards from '@hooks/useCards';
import {
	IS_IN_DECK,
	IS_IN_SIDEBOARD,
} from '@constants';
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
	const { cardsByAttribute } = useCards();
	const mainCount = useMemo(() => calculateCardCount(
		cardsByAttribute(IS_IN_DECK),
	),
	[cardsByAttribute]);
	const sideCount = useMemo(() => calculateSideboardCount(
		cardsByAttribute(IS_IN_SIDEBOARD),
	), [cardsByAttribute]);

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
