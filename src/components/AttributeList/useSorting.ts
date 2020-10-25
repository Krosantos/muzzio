import { useState, useCallback, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import forEach from 'lodash/forEach';

const { Menu, MenuItem } = require('electron').remote;

const alphaSort = (card:Card) => card.name;
const cmcSort = (card:Card) => card.cmc;
const countSort = (card:Card) => card.count || 1;
const deckSort = (card:Card) => card.count + card.sideboardCount;

const sortTypes = {
  ALPHA: { name: 'Alphabetical', sort: alphaSort },
  CMC: { name: 'CMC', sort: cmcSort },
  COUNT: { name: 'Count', sort: countSort },
  DECK: { name: 'In/Out of Deck', sort: deckSort },
};

type UseSorting = (cards:Card[])=>{
  openMenu: ()=>void;
  sortedCards: Card[];
}
const useSorting:UseSorting = (cards = []) => {
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
