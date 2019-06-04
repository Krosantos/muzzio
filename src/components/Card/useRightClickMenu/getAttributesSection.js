import get from 'lodash/get';
import { ALL_CARDS } from '@constants';
import { remote } from 'electron';

const { MenuItem } = remote;

// eslint-disable-next-line max-params
const getAttributeLine = (card, menu, attribute, addAttribute, removeAttribute) => {
	if (attribute === ALL_CARDS)
		return;
	const hasAttribute = get(card, ['attributes', attribute], false);
	const click = hasAttribute
		? () => removeAttribute(card, attribute)
		: () => addAttribute(card, attribute);

	menu.append(
		new MenuItem({
			checked: hasAttribute,
			click,
			label: attribute,
			type: 'checkbox',
		}),
	);
};

// eslint-disable-next-line max-params
const getAttributesSection = (card, menu, attributes, addAttribute, removeAttribute) => {
	if (attributes.length <= 1)
		return;
	menu.append(
		new MenuItem({ type: 'separator' }),
	);
	attributes.forEach((attribute) => getAttributeLine(card, menu, attribute, addAttribute, removeAttribute));
};

export default getAttributesSection;
