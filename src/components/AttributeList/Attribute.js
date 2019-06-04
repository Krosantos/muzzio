import React, { useCallback, useMemo } from 'react';
import get from 'lodash/get';
import filter from 'lodash/filter';
import values from 'lodash/values';
import CardList from '@components/CardList';
import useFormat from '@hooks/useFormat';
import useCards from '@hooks/useCards';
import { ALL_CARDS, IS_IN_DECK } from '@constants';
import useSorting from './useSorting';
import RemoveButton from './RemoveButton';
import { attribute as attributeStyle, attributeContainer, attributeTitle } from './styles.scss';

const getInDeckString = (cardsToShow, isSingleton) => {
	const cardsInDeck = filter(cardsToShow, (card) => get(card, ['attributes', IS_IN_DECK], false));

	return ` - ${cardsInDeck.length} of ${cardsToShow.length}`;
};

const Attribute = ({ attribute }) => {
	const { cards, addAttribute, cardsByAttribute } = useCards();
	const { isSingleton } = useFormat();
	const cardsToShow = useMemo(
		() => (attribute === ALL_CARDS ? values(cards) : cardsByAttribute(attribute)),
		[cards, attribute],
	);
	const inDeckString = useMemo(() => getInDeckString(cardsToShow, isSingleton), [cardsToShow]);
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
