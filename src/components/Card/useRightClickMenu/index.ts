/* eslint-disable max-params */
import { useCallback } from "react";
import useFormat from "@hooks/useFormat";
import useAttributes from "@hooks/useAttributes";
import useCards from "@hooks/useCards";
import getAttributesSection from "./getAttributesSection";
import getDeckLine from "./getDeckLine";
import getCountLine from "./getCountLine";
import getSideboardLine from "./getSideboardLine";
import getRemoveLine from "./getRemoveLine";

const { Menu } = require("electron").remote;

type MenuArgs = {
  addAttribute: (card: Card, attribute: string) => void;
  attributes: string[];
  card: Card;
  cardExists: (card: Card) => boolean;
  isSingleton: boolean;
  openCardCountModal: () => void;
  openSideboardCountModal: () => void;
  removeAttribute: (card: Card, attribute: string) => void;
  removeCard: (card: Card) => void;
  setCount: (card: Card, count: number) => void;
  setSideboardCount: (card: Card, sideboardCount: number) => void;
};
type GenerateMenu = (args: MenuArgs) => void;
const generateMenu: GenerateMenu = ({
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
  if (cardExists(card)) getRemoveLine(card, menu, removeCard);
  menu.popup();
};

type UseRightClickMenu = (
  card: Card,
  openCardCountModal: () => void,
  openSideboardCountModal: () => void,
) => () => void;
const useRightClickMenu: UseRightClickMenu = (
  card,
  openCardCountModal,
  openSideboardCountModal,
) => {
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
  const openMenu = useCallback(
    () =>
      generateMenu({
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
    ],
  );

  return openMenu;
};

export default useRightClickMenu;
