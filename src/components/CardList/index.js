import React, { useMemo } from 'react';
import values from 'lodash/values';
import Card from '../Card';

const CardList = ({ cards = [], callback = Function.prototype }) => {
	const cardArray = useMemo(() => {
		if (!Array.isArray(cards))
			return values(cards);
		return cards;
	}, [cards]);

	return (
		<>
			{
				cardArray.map((card) => (
					<Card
						key={card.id}
						callback={callback}
						cardId={card.id}
						rawCard={card}
					/>
				))
			}
		</>
	);
};

export default CardList;
