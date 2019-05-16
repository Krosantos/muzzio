import { useState, useCallback, useMemo } from 'react';
import { remote } from 'electron';
import sortBy from 'lodash/sortBy';
import forEach from 'lodash/forEach';
import { IS_IN_DECK } from '@constants';

const { Menu, MenuItem } = remote;

const alphaSort = (card) => card.name;
const cmcSort = (card) => card.cmc;
const deckSort = (card) => {
	const inDeck = card.attributes[IS_IN_DECK];

	return inDeck ? 1 : 0;
};

const sortTypes = {
	ALPHA: { name: 'Alphabetically', sort: alphaSort },
	CMC: { name: 'CMC', sort: cmcSort },
	DECK: { name: 'In/Out of Deck', sort: deckSort },
};

const useSorting = (cards = []) => {
	const [sortType, setSort] = useState(sortTypes.CMC);
	const openMenu = useCallback(() => {
		const menu = new Menu();

		forEach(sortTypes, (type) => {
			menu.append(
				new MenuItem({ click() { setSort(type); }, label: `Sort by ${type.name}` }),
			);
		});
		menu.popup();
	}, []);
	const sortedCards = useMemo(() => {
		const alpha = sortBy(cards, alphaSort);
		const cmc = sortBy(alpha, cmcSort);

		return sortBy(cmc, sortType.sort);
	}, [cards, sortType.sort]);

	return { openMenu, sortedCards };
};

export default useSorting;
