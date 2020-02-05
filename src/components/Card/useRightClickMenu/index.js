/* eslint-disable max-params */
import { remote } from 'electron';
import { useCallback } from 'react';
import useFormat from '@hooks/useFormat';
import useAttributes from '@hooks/useAttributes';
import useCards from '@hooks/useCards';
import getAttributesSection from './getAttributesSection';
import getDeckLine from './getDeckLine';
import getCountLine from './getCountLine';
import getSideboardLine from './getSideboardLine';
import getRemoveLine from './getRemoveLine';

const { Menu } = remote;

const generateMenu = ({
	addAttribute,
	attributes,
	card,
	cardExists,
	isSingleton,
	openCardCountModal,
	openSideboardCountModal,
	removeAttribute,
	removeCard,
	setCount,
	setSideboardCount,
}) => {
	const menu = new Menu();

	getDeckLine(isSingleton, card, menu, setCount);
	getCountLine(isSingleton, card, menu, setCount, openCardCountModal);
	getSideboardLine(isSingleton, card, menu, setSideboardCount, openSideboardCountModal);
	getAttributesSection(card, menu, attributes, addAttribute, removeAttribute);
	if (cardExists(card))
		getRemoveLine(card, menu, removeCard);
	menu.popup();
};

const useRightClickMenu = (card, openCardCountModal, openSideboardCountModal) => {
	const { attributes } = useAttributes();
	const {
		addAttribute,
		cardExists,
		removeAttribute,
		removeCard,
		setCount,
		setSideboardCount,
	} = useCards();
	const { isSingleton } = useFormat();
	const openMenu = useCallback(() => generateMenu({
		addAttribute,
		attributes,
		card,
		cardExists,
		isSingleton,
		openCardCountModal,
		openSideboardCountModal,
		removeAttribute,
		removeCard,
		setCount,
		setSideboardCount,
	}),
	[
		addAttribute,
		attributes,
		card,
		cardExists,
		isSingleton,
		openCardCountModal,
		openSideboardCountModal,
		removeAttribute,
		removeCard,
		setCount,
		setSideboardCount,
	]);

	return openMenu;
};

export default useRightClickMenu;
