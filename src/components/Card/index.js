import React, { useCallback, useState } from 'react';
import HoverArt from './HoverArt';
import ManaCost from './ManaCost';
import {
	card,
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

const Card = ({
	name = 'Footlight Fiend',
	cmc = 1,
	cost = '{3}{B}{G}',
	colors = [],
	attributes = {},
	imageUrl = 'https://img.scryfall.com/cards/png/front/8/c/8c604697-5c81-4329-9b16-f19bd90ba08c.png?1549415015',
	reverseUrl,
}) => {
	const className = `${card} ${getColorClass(colors)}`;
	const [shouldShowArt, setShowArt] = useState(false);
	const hideArt = useCallback(() => setShowArt(false));
	const showArt = useCallback(() => setShowArt(true));

	return (
		<>
			<div className={className} onMouseEnter={showArt} onMouseLeave={hideArt}>
				{name}
				<ManaCost cost={cost} />
			</div>
			{shouldShowArt && <HoverArt imageUrl={imageUrl} reverseUrl={reverseUrl} />}
		</>
	);
};

export default Card;
