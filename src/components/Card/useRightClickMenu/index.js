/* eslint-disable max-params */
import { remote } from 'electron';
import { useCallback } from 'react';
import useFormat from '@hooks/useFormat';
import useAttributes from '@hooks/useAttributes';
import useCards from '@hooks/useCards';
import getAttributesSection from './getAttributesSection';
import getDeckLine from './getDeckLine';
import getCountLine from './getCountLine';
import getRemoveLine from './getRemoveLine';

const { Menu } = remote;

const generateMenu = (
	format,
	card,
	attributes,
	addAttribute,
	addCard,
	cardExists,
	removeAttribute,
	removeCard,
	setCount,
) => {
	const menu = new Menu();

	getDeckLine(card, menu, addAttribute, removeAttribute);
	getCountLine(format, card, menu, setCount);
	getAttributesSection(card, menu, attributes, addAttribute, removeAttribute);
	if (cardExists(card))
		getRemoveLine(card, menu, removeCard);
	menu.popup();
};

const useRightClickMenu = (card) => {
	const { attributes } = useAttributes();
	const {
		addAttribute,
		addCard,
		cardExists,
		removeAttribute,
		removeCard,
		setCount,
	} = useCards();
	const { format } = useFormat();
	const openMenu = useCallback(() => generateMenu(
		format,
		card,
		attributes, addAttribute,
		addCard,
		cardExists,
		removeAttribute,
		removeCard,
		setCount,
	),
	[card, attributes, format]);

	return openMenu;
};

export default useRightClickMenu;
