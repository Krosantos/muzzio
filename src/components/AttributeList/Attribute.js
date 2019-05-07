import React, { useCallback, useMemo } from 'react';
import get from 'lodash/get';
import CardList from '@components/CardList';
import useCards from '@hooks/useCards';
import { IS_IN_DECK } from '@constants';
import RemoveButton from './RemoveButton';
import { attribute as attributeStyle, attributeContainer, attributeTitle } from './styles.scss';

const getInDeckString = (cardsToShow) => {
	const cardsInDeck = cardsToShow.filter((card) => get(card, ['attributes', IS_IN_DECK], false));

	return ` - ${cardsInDeck.length} of ${cardsToShow.length}`;
};

const Attribute = ({ attribute }) => {
	const { cards, addAttribute, cardsByAttribute } = useCards();
	const cardsToShow = useMemo(() => (cardsByAttribute(attribute)), [cards, attribute]);
	const inDeckString = useMemo(() => getInDeckString(cardsToShow), [cardsToShow]);
	const callback = useCallback((card) => {
		addAttribute(card, attribute);
	}, [attribute]);

	return (
		<div className={attributeContainer}>
			<div className={attributeTitle}>
				<span>
					{attribute}
					{inDeckString}
				</span>
				<RemoveButton attribute={attribute} />
			</div>
			<div className={attributeStyle}>
				<CardList callback={callback} cards={cardsToShow} />
			</div>
		</div>
	);
};

export default Attribute;
