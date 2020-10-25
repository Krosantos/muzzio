import { remote } from 'electron';

const { MenuItem } = remote;

const getRemoveLine = (card, menu, removeCard) => {
  menu.append(
    new MenuItem({ type: 'separator' }),
  );
  menu.append(
    new MenuItem({ click() { removeCard(card); }, label: 'Remove Card' }),
  );
};

export default getRemoveLine;
