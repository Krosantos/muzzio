/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo } from 'react';
import ManaCost from '@components/ManaCost';
import { IS_IN_DECK } from '@constants';
import useHoverArt from './useHoverArt';
import useRightClickMenu from './useRightClickMenu';
import useCard from './useCard';
import HoverArt from './HoverArt';
import getColorClass from './getColorClass';
import { cardRow } from './styles.scss';

// eslint-disable-next-line max-statements
const Card = ({
	callback = Function.prototype,
	rawCard,
	cardId,
	alwaysColorful,
}) => {
	const card = useCard(cardId, rawCard);
	const {
		attributes,
		cost,
		count,
		name,
		imageUrl,
		reverseUrl,
	} = card;
	const nameAndCount = useMemo(() => {
		if (!count || count <= 1)
			return name;
		return `${count} ${name}`;
	}, [count, name]);
	const fireCallback = useCallback(() => callback(card), [card, callback]);
	const className = useMemo(() => `${cardRow} ${getColorClass(card, alwaysColorful)}`, [count]);
	const handleContextClick = useRightClickMenu(card);
	const { shouldShowArt, showArt, hideArt } = useHoverArt();

	return (
		<>
			<div
				className={className}
				onClick={fireCallback}
				onContextMenu={handleContextClick}
				onMouseEnter={showArt}
				onMouseLeave={hideArt}
			>
				{nameAndCount}
				<ManaCost cost={cost} />
			</div>
			{shouldShowArt && <HoverArt imageUrl={imageUrl} reverseUrl={reverseUrl} />}
		</>
	);
};

export default React.memo(Card);
