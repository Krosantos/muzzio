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
		name,
		imageUrl,
		reverseUrl,
	} = card;
	const fireCallback = useCallback(() => callback(card), [card, callback]);
	const className = useMemo(() => `${cardRow} ${getColorClass(card, alwaysColorful)}`, [attributes[IS_IN_DECK]]);
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
				{name}
				<ManaCost cost={cost} />
			</div>
			{shouldShowArt && <HoverArt imageUrl={imageUrl} reverseUrl={reverseUrl} />}
		</>
	);
};

export default React.memo(Card);
