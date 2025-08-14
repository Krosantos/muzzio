import { CARD_MAX } from "@constants";
import { Menu, MenuItem as MenuItemType } from "electron";

const { MenuItem } = require("electron").remote;

type GenerateUnlimitedMenu = (openSideboardCountModal: () => void) => MenuItemType;
const generateUnlimitedMenu: GenerateUnlimitedMenu = (openSideboardCountModal) =>
  new MenuItem({
    click: openSideboardCountModal,
    label: "Set Sideboard Count",
  });

type GenerateSubmenu = (
  card: Card,
  setSideboardCount: (cardName: string, count: number) => void,
) => { click: () => void; label: string }[];
const generateSubmenu: GenerateSubmenu = (card, setSideboardCount) => {
  const submenu = [];

  for (let x = 0; x <= CARD_MAX; x += 1) {
    submenu.push({
      click: () => setSideboardCount(card.name, x),
      label: `Set sideboard count to ${x}`,
    });
  }
  return submenu;
};

type GetSideboardLine = (
  isSingleton: boolean,
  card: Card,
  menu: Menu,
  setSideboardCount: (cardName: string, sideboardCount: number) => void,
  openSideboardCountModal: () => void,
) => void;

const getSideboardLine: GetSideboardLine = (
  isSingleton,
  card,
  menu,
  setSideboardCount,
  openSideboardCountModal,
) => {
  const { isUnlimited = false } = card;

  if (isSingleton && !isUnlimited) return;

  if (isUnlimited) {
    menu.append(generateUnlimitedMenu(openSideboardCountModal));
  } else {
    menu.append(
      new MenuItem({
        label: "Set Sideboard Count",
        submenu: generateSubmenu(card, setSideboardCount),
      }),
    );
  }
};

export default getSideboardLine;
