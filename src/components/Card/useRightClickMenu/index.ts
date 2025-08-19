import { useCallback } from "react";
import getAttributesSection from "./getAttributesSection";
import getDeckLine from "./getDeckLine";
import getCountLine from "./getCountLine";
import getSideboardLine from "./getSideboardLine";
import getRemoveLine from "./getRemoveLine";
import { Attribute, useAttributes } from "@contexts/Attributes";
import { useFormat } from "@contexts/Format";
import { useCards } from "@contexts/Card";
import getOtherVersions from "./getOtherVersions";

const { Menu } = require("electron").remote;

type MenuArgs = {
  addCardToAttribute: (cardName: string, attributeName: string) => void;
  removeCardFromAttribute: (cardName: string, attributeName: string) => void;
  attributes: { [attributeName: string]: Attribute };
  card: Card;
  cardExists: boolean;
  currentCount: number;
  isSingleton: boolean;
  openCardCountModal: () => void;
  openSideboardCountModal: () => void;
  openVariantModal: () => void;
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
  currentCount,
  isSingleton,
  openCardCountModal,
  openSideboardCountModal,
  openVariantModal,
  removeCard,
  setCount,
  setSideboardCount,
}) => {
  const menu = new Menu();

  getDeckLine(isSingleton, currentCount > 0, card, menu, setCount);
  getCountLine(isSingleton, card, menu, setCount, openCardCountModal);
  getSideboardLine(isSingleton, card, menu, setSideboardCount, openSideboardCountModal);
  getAttributesSection(
    card,
    menu,
    attributes,
    cardExists,
    addCardToAttribute,
    removeCardFromAttribute,
  );
  if (cardExists) getRemoveLine(card, menu, removeCard);
  if (cardExists) getOtherVersions(menu, openVariantModal);
  menu.popup();
};

type UseRightClickMenu = (
  card: Card,
  openCardCountModal: () => void,
  openSideboardCountModal: () => void,
  openVariantModal: () => void,
) => () => void;
const useRightClickMenu: UseRightClickMenu = (
  card,
  openCardCountModal,
  openSideboardCountModal,
  openVariantModal,
) => {
  const attributes = useAttributes((s) => s.attributes);
  const addCardToAttribute = useAttributes((s) => s.addCardToAttribute);
  const removeCardFromAttribute = useAttributes((s) => s.removeCardFromAttribute);
  const removeCard = useCards((s) => s.removeCard);
  const setCount = useCards((s) => s.setCount);
  const setSideboardCount = useCards((s) => s.setSideboardCount);
  const cardExists = useCards((s) => !!s.cardData[card.name]);
  const currentCount = useCards((s) => s.cardsInDeck[card.name]) ?? 0;

  const isSingleton = useFormat((s) => s.isSingleton);
  const openMenu = useCallback(
    () =>
      generateMenu({
        addCardToAttribute,
        removeCardFromAttribute,
        attributes,
        card,
        cardExists,
        currentCount,
        isSingleton,
        openCardCountModal,
        openSideboardCountModal,
        openVariantModal,
        removeCard,
        setCount,
        setSideboardCount,
      }),
    [
      addCardToAttribute,
      attributes,
      card,
      cardExists,
      currentCount,
      isSingleton,
      openCardCountModal,
      openSideboardCountModal,
      openVariantModal,
      removeCard,
      removeCardFromAttribute,
      setCount,
      setSideboardCount,
    ],
  );

  return openMenu;
};

export default useRightClickMenu;
