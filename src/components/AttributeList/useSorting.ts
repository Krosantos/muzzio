import { useState, useCallback, useMemo } from "react";
import sortBy from "lodash/sortBy";
import forEach from "lodash/forEach";

const { Menu, MenuItem } = require("electron").remote;

const alphaSort = (card: Card) => card.name;
const cmcSort = (card: Card) => card.cmc;
type SortType = {
  name: string;
  sort: (card: Card) => string | number;
};

const sortTypes: { [key: string]: SortType } = {
  ALPHA: { name: "Alphabetical", sort: alphaSort },
  CMC: { name: "CMC", sort: cmcSort },
};

type UseSorting = (cards: Card[]) => {
  openMenu: () => void;
  sortedCards: Card[];
};
const useSorting: UseSorting = (cards = []) => {
  const [sortType, setSort] = useState<SortType>(sortTypes.CMC);
  const openMenu = useCallback(() => {
    const menu = new Menu();

    forEach(sortTypes, (type) => {
      menu.append(
        new MenuItem({
          click() {
            setSort(type);
          },
          label: `Sort by ${type.name}`,
        }),
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
