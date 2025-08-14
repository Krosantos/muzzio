import { Menu } from "electron";

const { MenuItem } = require("electron").remote;

type GetDeckline = (
  isSingleton: boolean,
  isInDeck: boolean,
  card: Card,
  menu: Menu,
  setCount: (cardName: string, count: number) => void,
) => void;
const getDeckLine: GetDeckline = (isSingleton, isInDeck, card, menu, setCount) => {
  if (!isSingleton) return;

  if (isInDeck) {
    menu.append(
      new MenuItem({
        click() {
          setCount(card.name, 0);
        },
        label: "Remove From Deck",
      }),
    );
  } else {
    menu.append(
      new MenuItem({
        click() {
          setCount(card.name, 1);
        },
        label: "Add to Deck",
      }),
    );
  }
};

export default getDeckLine;
