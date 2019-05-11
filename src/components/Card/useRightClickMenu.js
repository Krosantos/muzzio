/* eslint-disable max-params */
import { remote } from 'electron';
import get from 'lodash/get';
import { useCallback } from 'react';
import { IS_IN_DECK } from '@constants';
import useAttributes from '@hooks/useAttributes';
import useCards from '@hooks/useCards';

const { Menu, MenuItem } = remote;

const getDeckLine = (card, menu, addAttribute, removeAttribute) => {
	const isInDeck = get(card, ['attributes', IS_IN_DECK], false);

	if (isInDeck) {
		menu.append(
			new MenuItem({ click() { removeAttribute(card, IS_IN_DECK); }, label: 'Remove From Deck' }),
		);
	} else {
		menu.append(
			new MenuItem({ click() { addAttribute(card, IS_IN_DECK); }, label: 'Add to Deck' }),
		);
	}
};

const getAttributeLine = (card, menu, attribute, addAttribute, removeAttribute) => {
	const hasAttribute = get(card, ['attributes', attribute], false);

	if (hasAttribute) {
		menu.append(
			new MenuItem({ click() { removeAttribute(card, attribute); }, label: `Remove from ${attribute}` }),
		);
	} else {
		menu.append(
			new MenuItem({ click() { addAttribute(card, attribute); }, label: `Add to ${attribute}` }),
		);
	}
};

const getAttributesSection = (card, menu, attributes, addAttribute, removeAttribute) => {
	if (!attributes.length)
		return;
	menu.append(
		new MenuItem({ type: 'separator' }),
	);
	attributes.forEach((attribute) => getAttributeLine(card, menu, attribute, addAttribute, removeAttribute));
};

const getRemoveLine = (card, menu, removeCard) => {
	menu.append(
		new MenuItem({ type: 'separator' }),
	);
	menu.append(
		new MenuItem({ click() { removeCard(card); }, label: 'Remove Card' }),
	);
};

const generateMenu = (
	card,
	attributes,
	addAttribute,
	addCard,
	removeAttribute,
	removeCard,
) => {
	const menu = new Menu();

	getDeckLine(card, menu, addAttribute, removeAttribute);
	getAttributesSection(card, menu, attributes, addAttribute, removeAttribute);
	getRemoveLine(card, menu, removeCard);
	menu.popup();
};

const useRightClickMenu = (card) => {
	const { attributes } = useAttributes();
	const {
		addAttribute,
		addCard,
		removeAttribute,
		removeCard,
	} = useCards();
	const openMenu = useCallback(() => generateMenu(
		card,
		attributes, addAttribute,
		addCard,
		removeAttribute,
		removeCard,
	),
	[card, attributes]);

	return openMenu;
};

export default useRightClickMenu;
