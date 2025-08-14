import { Menu } from "electron";
import { Attribute } from "@contexts/Attributes";
import { values } from "lodash";
import { useCards } from "@contexts/Card";

const { MenuItem } = require("electron").remote;

type GetAttributeLine = (
  card: Card,
  menu: Menu,
  attribute: Attribute,
  cardExists,
  addAttribute: (cardName: string, attributeName: string) => void,
  removeAttribute: (cardName: string, attributeName: string) => void,
) => void;

const getAttributeLine: GetAttributeLine = (
  card,
  menu,
  attribute,
  cardExists,
  addAttribute,
  removeAttribute,
) => {
  if (!cardExists) useCards.getState().addCard(card);
  const hasAttribute = !!attribute.cards[card.name];
  const click = hasAttribute
    ? () => removeAttribute(card.name, attribute.name)
    : () => addAttribute(card.name, attribute.name);

  menu.append(
    new MenuItem({
      checked: hasAttribute,
      click,
      label: attribute.name,
      type: "checkbox",
    }),
  );
};

type GetAttributesSection = (
  card: Card,
  menu: Menu,
  attributes: { [attributeName: string]: Attribute },
  cardExists: boolean,
  addAttribute: (cardName: string, attributeName: string) => void,
  removeAttribute: (cardName: string, attributeName: string) => void,
) => void;

const getAttributesSection: GetAttributesSection = (
  card,
  menu,
  attributes,
  cardExists,
  addAttribute,
  removeAttribute,
) => {
  const attList = values(attributes);
  if (attList.length <= 1) return;
  menu.append(new MenuItem({ type: "separator" }));
  attList.forEach((attribute) =>
    getAttributeLine(card, menu, attribute, cardExists, addAttribute, removeAttribute),
  );
};

export default getAttributesSection;
