import { CARD_MAX } from '@constants';
import { Menu, MenuItem as MenuItemType } from 'electron';

const { MenuItem } = require('electron').remote;

type GenerateUnlimitedMenu = (
  openSideboardCountModal:()=>void
)=>MenuItemType
const generateUnlimitedMenu:GenerateUnlimitedMenu = (openCountModal) => new MenuItem({
  click: openCountModal,
  label: 'Set Count',
});

type GenerateSubmenu =(
  card:Card,
  setSideboardCount:(otherCard:Card, count:number)=>void
)=>{click:Function; label:string}[]
const generateSubmenu:GenerateSubmenu = (card, setCount) => {
  const submenu = [];

  for (let x = 0; x <= CARD_MAX; x += 1) {
    submenu.push({
      click: () => setCount(card, x),
      label: `Set count to ${x}`,
    });
  }
  return submenu;
};

type GetCountLine = (
  isSingleton:boolean,
  card:Card,
  menu:Menu,
  setCount:(otherCard: Card, count: number) => void,
  openCountModal:()=>void
)=>void
// eslint-disable-next-line max-params
const getCountLine:GetCountLine = (isSingleton, card, menu, setCount, openCountModal) => {
  const { isUnlimited = false } = card;

  if (isSingleton && !isUnlimited)
    return;

  if (isUnlimited) {
    menu.append(generateUnlimitedMenu(openCountModal));
  } else {
    menu.append(
      new MenuItem({
        label: 'Set Count',
        submenu: generateSubmenu(card, setCount),
      }),
    );
  }
};

export default getCountLine;
