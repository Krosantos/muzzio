import React, { useCallback, useContext, useState } from 'react';
import { CardContext } from '@contexts/Card';
import ManaCost from '@components/ManaCost';
import HoverArt from './HoverArt';
import {
	cardRow,
	white,
	blue,
	black,
	red,
	green,
	multi,
	colorless,
} from './styles.scss';

// eslint-disable-next-line complexity
const getColorClass = (colors) => {
	if (!colors.length)
		return colorless;
	if (colors.length > 1)
		return multi;
	switch (colors[0]) {
	case 'W':
		return white;
	case 'U':
		return blue;
	case 'B':
		return black;
	case 'R':
		return red;
	case 'G':
		return green;
	default:
		return colorless;
	}
};

// eslint-disable-next-line max-statements
const Card = (card) => {
	const {
		colors, name, cost, imageUrl, reverseUrl, id,
	} = card;
	const className = `${cardRow} ${getColorClass(colors)}`;
	const [shouldShowArt, setShowArt] = useState(false);
	const hideArt = useCallback(() => setShowArt(false));
	const showArt = useCallback(() => setShowArt(true));

	const { dispatch } = useContext(CardContext);
	const addCard = useCallback(() => {
		const type = 'add';
		const payload = { card, id };

		dispatch({ payload, type });
	});

	return (
		<>
			<div className={className} onClick={addCard} onMouseEnter={showArt} onMouseLeave={hideArt}>
				{name}
				<ManaCost cost={cost} />
			</div>
			{shouldShowArt && <HoverArt imageUrl={imageUrl} reverseUrl={reverseUrl} />}
		</>
	);
};

export default Card;
