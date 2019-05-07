import React, { useCallback, useMemo } from 'react';
import get from 'lodash/get';
import useCards from '@hooks/useCards';
import { IS_IN_DECK } from '@constants';
import { menuRow } from './styles.scss';

const DeckRow = ({ card }) => {
	const { addAttribute, removeAttribute } = useCards();
	const isInDeck = useMemo(() => get(card, ['attributes', IS_IN_DECK], false), [card]);
	const menuText = useMemo(() => (isInDeck ? 'Remove from Deck' : 'Add to Deck'), [isInDeck]);
	const handleClick = useCallback(() => {
		if (isInDeck)
			removeAttribute(card, IS_IN_DECK);
		else
			addAttribute(card, IS_IN_DECK);
	}, [isInDeck]);

	return (
		<div className={menuRow} onClick={handleClick}>
			{menuText}
		</div>
	);
};

export default DeckRow;
