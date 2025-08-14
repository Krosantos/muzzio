import { useCallback } from "react";
import getAttributesSection from "./getAttributesSection";
import getDeckLine from "./getDeckLine";
import getCountLine from "./getCountLine";
import getSideboardLine from "./getSideboardLine";
import getRemoveLine from "./getRemoveLine";
import { Attribute, useAttributes } from "@contexts/Attributes";
import { useFormat } from "@contexts/Format";
import { useCards } from "@contexts/Card";

const { Menu } = require("electron").remote;

type MenuArgs = {
  addCardToAttribute: (cardName: string, attributeName: string) => void;
  removeCardFromAttribute: (cardName: string, attributeName: string) => void;
  attributes: Attribute[];
  card: Card;
  cardExists: boolean;
  isSingleton: boolean;
  openCardCountModal: () => void;
  openSideboardCountModal: () => void;
  removeCard: (cardName: string) => void;
  setCount: (cardName: string, count: number) => void;
  setSideboardCount: (cardName: string, sideboardCount: number) => void;
};
type GenerateMenu = (args: MenuArgs) => void;
const generateMenu: GenerateMenu = ({
  addCardToAttribute,
  removeCardFromAttribute,
  attributes,
  card,
  cardExists,
  isSingleton,
  openCardCountModal,
  openSideboardCountModal,
  removeCard,
  setCount,
  setSideboardCount,
}) => {
  const menu = new Menu();

  getDeckLine(isSingleton, card, menu, setCount);
  getCountLine(isSingleton, card, menu, setCount, openCardCountModal);
  getSideboardLine(isSingleton, card, menu, setSideboardCount, openSideboardCountModal);
  getAttributesSection(
    card,
    menu,
    attributes,
    addCardToAttribute,
    removeCardFromAttribute,
  );
  if (cardExists) getRemoveLine(card, menu, removeCard);
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
  const attributes = useAttributes((s) => s.attributes);
  const addCardToAttribute = useAttributes((s) => s.addCardToAttribute);
  const removeCardFromAttribute = useAttributes((s) => s.removeCardFromAttribute);
  const removeCard = useCards((s) => s.removeCard);
  const setCount = useCards((s) => s.setCount);
  const setSideboardCount = useCards((s) => s.setSideboardCount);
  const cardExists = useCards((s) => !!s.cardData[card.name]);

  const isSingleton = useFormat((s) => s.isSingleton);
  const openMenu = useCallback(
    () =>
      generateMenu({
        addCardToAttribute,
        removeCardFromAttribute,
        attributes,
        card,
        cardExists,
        isSingleton,
        openCardCountModal,
        openSideboardCountModal,
        removeCard,
        setCount,
        setSideboardCount,
      }),
    [
      addCardToAttribute,
      attributes,
      card,
      cardExists,
      isSingleton,
      openCardCountModal,
      openSideboardCountModal,
      removeCard,
      removeCardFromAttribute,
      setCount,
      setSideboardCount,
    ],
  );

  return openMenu;
};

export default useRightClickMenu;
