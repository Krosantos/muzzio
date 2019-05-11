/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo, useState } from 'react';
import ManaCost from '@components/ManaCost';
import useRightClickMenu from './useRightClickMenu';
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
const getColorClass = (colors = []) => {
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
const Card = ({ callback = Function.prototype, card }) => {
	const {
		colors, name, cost, imageUrl, reverseUrl,
	} = card;
	const [shouldShowArt, setShowArt] = useState(false);
	const hideArt = useCallback(() => setShowArt(false));
	const showArt = useCallback(() => setShowArt(true));
	const fireCallback = useCallback(() => callback(card));
	const className = useMemo(() => `${cardRow} ${getColorClass(colors)}`, [colors]);
	const handleContextClick = useRightClickMenu(card);

	return (
		<>
			<div
				className={className}
				onClick={fireCallback}
				onContextMenu={handleContextClick}
				onMouseEnter={showArt}
				onMouseLeave={hideArt}
			>
				{name}
				<ManaCost cost={cost} />
			</div>
			{shouldShowArt && <HoverArt imageUrl={imageUrl} reverseUrl={reverseUrl} />}
		</>
	);
};

export default React.memo(Card);
