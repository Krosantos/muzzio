
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import useCards from '@hooks/useCards';
import { menuRow, divider } from './styles.scss';

const REMOVE = 'Remove Card';

const RemoveRow = ({ card }) => {
	const { cardExists, removeCard } = useCards();
	const handleClick = useCallback(() => removeCard(card), [card]);

	if (!cardExists(card))
		return null;
	return (
		<>
			<div className={divider} />
			<div className={menuRow} onClick={handleClick}>
				{REMOVE}
			</div>
		</>
	);
};

export default RemoveRow;
