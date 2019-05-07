import React, { useMemo } from 'react';
import useCardMenu from '@hooks/useCardMenu';
import DeckRow from './DeckRow';
import { contextMenu, divider } from './styles.scss';

const MENU_WIDTH = 250;

const ContextMenu = () => {
	const {
		card,
		isOpen,
		closeMenu,
		x,
		y,
	} = useCardMenu();
	const position = useMemo(() => {
		const maxWidth = window.innerWidth;
		const xCoord = (x + MENU_WIDTH > maxWidth) ? (maxWidth - MENU_WIDTH) : x;

		return { left: xCoord, top: y };
	}, [x, y]);

	if (!isOpen)
		return null;
	return (
		<div
			className={contextMenu}
			onMouseLeave={closeMenu}
			style={position}
		>
			<DeckRow card={card} />
			<div className={divider} />
		</div>
	);
};

export default ContextMenu;
