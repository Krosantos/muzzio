import get from 'lodash/get';
import { ALL_CARDS } from '@constants';
import { Menu } from 'electron';

const { MenuItem } = require('electron').remote;

type GetAttributeLine = (
  card:Card,
  menu:Menu,
  attribute:string,
  addAttribute:(addCard:Card, addAttr:string)=>void,
  removeAttribute:(removeCard:Card, removeAttr:string)=>void
)=>void
// eslint-disable-next-line max-params
const getAttributeLine:GetAttributeLine = (card, menu, attribute, addAttribute, removeAttribute) => {
  if (attribute === ALL_CARDS)
    return;
  const hasAttribute = get(card, ['attributes', attribute], false);
  const click = hasAttribute
    ? () => removeAttribute(card, attribute)
    : () => addAttribute(card, attribute);

  menu.append(
    new MenuItem({
      checked: hasAttribute,
      click,
      label: attribute,
      type: 'checkbox',
    }),
  );
};

type GetAttributesSection =(
  card:Card,
  menu:Menu,
  attributes:string[],
  addAttribute:(addCard:Card, addAttr:string)=>void,
  removeAttribute:(removeCard:Card, removeAttr:string)=>void
)=>void
// eslint-disable-next-line max-params
const getAttributesSection:GetAttributesSection = (card, menu, attributes, addAttribute, removeAttribute) => {
  if (attributes.length <= 1)
    return;
  menu.append(
    new MenuItem({ type: 'separator' }),
  );
  attributes.forEach((attribute) => getAttributeLine(
    card,
    menu,
    attribute,
    addAttribute,
    removeAttribute,
  ));
};

export default getAttributesSection;
