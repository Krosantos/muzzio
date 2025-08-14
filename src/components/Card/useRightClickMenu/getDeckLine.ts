import { useCards } from "@contexts/Card";
import { Menu } from "electron";

const { MenuItem } = require("electron").remote;

type GetDeckline = (
  isSingleton: boolean,
  card: Card,
  menu: Menu,
  setCount: (cardName: string, count: number) => void,
) => void;
const getDeckLine: GetDeckline = (isSingleton, card, menu, setCount) => {
  if (!isSingleton) return;
  const isInDeck = !!useCards.getState().cardsInDeck[card.name];

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
