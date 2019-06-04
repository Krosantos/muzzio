import React, { useMemo } from 'react';
import values from 'lodash/values';
import Card from '../Card';

const CardList = ({
	alwaysColorful = false,
	cards = [],
	callback = Function.prototype,
	useMaindeckCount = false,
	useSideboardCount = false,
}) => {
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
						alwaysColorful={alwaysColorful}
						callback={callback}
						cardId={card.id}
						rawCard={card}
						useMaindeckCount={useMaindeckCount}
						useSideboardCount={useSideboardCount}
					/>
				))
			}
		</>
	);
};

export default CardList;
