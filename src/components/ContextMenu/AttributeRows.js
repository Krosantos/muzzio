import React, { useCallback, useMemo } from 'react';
import get from 'lodash/get';
import useCards from '@hooks/useCards';
import useAttributes from '@hooks/useAttributes';
import { menuRow, divider } from './styles.scss';

const AttributeRows = ({ card }) => {
	const { attributes } = useAttributes();

	return (
		<>
			<div className={divider} />
			{attributes.map((attribute) => <AttributeRow key={attribute} attribute={attribute} card={card} />)}
		</>
	);
};

const AttributeRow = ({ attribute, card }) => {
	const { addAttribute, removeAttribute } = useCards();
	const hasAttribute = useMemo(() => get(card, ['attributes', attribute], false), [card]);
	const menuText = useMemo(() => (hasAttribute ? `Remove from ${attribute}` : `Add to ${attribute}`), [hasAttribute]);
	const handleClick = useCallback(() => {
		if (hasAttribute)
			removeAttribute(card, attribute);
		else
			addAttribute(card, attribute);
	}, [hasAttribute]);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div className={menuRow} onClick={handleClick}>
			{menuText}
		</div>
	);
};

export default AttributeRows;
