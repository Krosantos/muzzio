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

const generateMenu = ({
	addAttribute,
	attributes,
	card,
	cardExists,
	isSingleton,
	openCardCountModal,
	removeAttribute,
	removeCard,
	setCount,
}) => {
	const menu = new Menu();

	getDeckLine(card, menu, addAttribute, removeAttribute);
	getCountLine(isSingleton, card, menu, setCount, openCardCountModal);
	getAttributesSection(card, menu, attributes, addAttribute, removeAttribute);
	if (cardExists(card))
		getRemoveLine(card, menu, removeCard);
	menu.popup();
};

const useRightClickMenu = (card, openCardCountModal) => {
	const { attributes } = useAttributes();
	const {
		addAttribute,
		cardExists,
		removeAttribute,
		removeCard,
		setCount,
	} = useCards();
	const { isSingleton } = useFormat();
	const openMenu = useCallback(() => generateMenu({
		addAttribute,
		attributes,
		card,
		cardExists,
		isSingleton,
		openCardCountModal,
		removeAttribute,
		removeCard,
		setCount,
	}),
	[card, attributes, isSingleton]);

	return openMenu;
};

export default useRightClickMenu;
