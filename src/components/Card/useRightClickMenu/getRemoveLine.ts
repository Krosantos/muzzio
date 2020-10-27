import { Menu } from "electron";

const { MenuItem } = require("electron").remote;

type GetRemoveLine = (
  card: Card,
  menu: Menu,
  removeCard: (otherCard: Card) => void,
) => void;
const getRemoveLine: GetRemoveLine = (card, menu, removeCard) => {
  menu.append(new MenuItem({ type: "separator" }));
  menu.append(
    new MenuItem({
      click() {
        removeCard(card);
      },
      label: "Remove Card",
    }),
  );
};

export default getRemoveLine;
