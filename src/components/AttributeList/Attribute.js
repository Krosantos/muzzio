import React, { useCallback, useMemo } from 'react';
import CardList from '@components/CardList';
import useCards from '@hooks/useCards';
import { ALL_CARDS } from '@constants';
import RemoveButton from './RemoveButton';
import { attribute as attributeStyle, attributeContainer, attributeTitle } from './styles.scss';

const Attribute = ({ attribute }) => {
	const { cards, addAttribute, cardsByAttribute } = useCards();
	const cardsToShow = useMemo(() => (
		attribute === ALL_CARDS ? cards : cardsByAttribute(attribute)
	), [cards, attribute]);
	const callback = useCallback((card) => {
		addAttribute(card, attribute);
	}, [attribute]);

	return (
		<div className={attributeContainer}>
			<div className={attributeTitle}>
				<span>
					{attribute}
				</span>
				{attribute !== ALL_CARDS && <RemoveButton attribute={attribute} />}
			</div>
			<div className={attributeStyle}>
				<CardList callback={callback} cards={cardsToShow} />
			</div>
		</div>
	);
};

export default Attribute;
