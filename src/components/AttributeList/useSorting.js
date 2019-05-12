import { useState, useCallback, useMemo } from 'react';
import { remote } from 'electron';
import sortBy from 'lodash/sortBy';
import forEach from 'lodash/forEach';
import { IS_IN_DECK } from '@constants';

const { Menu, MenuItem } = remote;

const sortTypes = {
	ALPHA: { name: 'Alphabetically', sort: (card) => card.name },
	CMC: { name: 'CMC', sort: (card) => card.cmc },
	DECK: { name: 'In/Out of Deck', sort: (card) => card.attributes[IS_IN_DECK] },
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
	const sortedCards = useMemo(() => sortBy(cards, sortType.sort), [cards, sortType.sort]);

	return { openMenu, sortedCards };
};

export default useSorting;
