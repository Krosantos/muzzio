import get from "lodash/get";
import { Menu } from "electron";
import { Attribute } from "@contexts/Attributes";

const { MenuItem } = require("electron").remote;

type GetAttributeLine = (
  card: Card,
  menu: Menu,
  attribute: string,
  addAttribute: (cardName: string, attributeName: string) => void,
  removeAttribute: (cardName: string, attributeName: string) => void,
) => void;

const getAttributeLine: GetAttributeLine = (
  card,
  menu,
  attribute,
  addAttribute,
  removeAttribute,
) => {
  const hasAttribute = get(card, ["attributes", attribute], false);
  const click = hasAttribute
    ? () => removeAttribute(card.name, attribute)
    : () => addAttribute(card.name, attribute);

  menu.append(
    new MenuItem({
      checked: hasAttribute,
      click,
      label: attribute,
      type: "checkbox",
    }),
  );
};

type GetAttributesSection = (
  card: Card,
  menu: Menu,
  attributes: Attribute[],
  addAttribute: (cardName: string, attributeName: string) => void,
  removeAttribute: (cardName: string, attributeName: string) => void,
) => void;

const getAttributesSection: GetAttributesSection = (
  card,
  menu,
  attributes,
  addAttribute,
  removeAttribute,
) => {
  if (attributes.length <= 1) return;
  menu.append(new MenuItem({ type: "separator" }));
  attributes.forEach((attribute) =>
    getAttributeLine(card, menu, attribute.name, addAttribute, removeAttribute),
  );
};

export default getAttributesSection;
