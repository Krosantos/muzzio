import React, { useCallback, useMemo } from 'react';
import values from 'lodash/values';
import CardList from '@components/CardList';
import useCards from '@hooks/useCards';
import { ALL_CARDS } from '@constants';
import useSorting from './useSorting';
import useInDeckString from './useInDeckString';
import RemoveButton from './RemoveButton';
import { attribute as attributeStyle, attributeContainer, attributeTitle } from './styles.scss';

const Attribute = ({ attribute }) => {
	const { cards, addAttribute, cardsByAttribute } = useCards();
	const cardsToShow = useMemo(
		() => (attribute === ALL_CARDS ? values(cards) : cardsByAttribute(attribute)),
		[cards, attribute],
	);
	const inDeckString = useInDeckString(attribute);
	const callback = useCallback((card) => {
		addAttribute(card, attribute);
	}, [attribute]);
	const { openMenu, sortedCards } = useSorting(cardsToShow);

	return (
		<div className={attributeContainer}>
			<div className={attributeTitle}>
				<span onContextMenu={openMenu}>
					{attribute}
					{inDeckString}
				</span>
				{attribute !== ALL_CARDS && <RemoveButton attribute={attribute} />}
			</div>
			<div className={attributeStyle}>
				<CardList callback={callback} cards={sortedCards} />
			</div>
		</div>
	);
};

export default Attribute;
