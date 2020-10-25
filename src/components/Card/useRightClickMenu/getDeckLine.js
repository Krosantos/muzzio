import remote from '@electron/remote';

const { MenuItem } = remote;

const getDeckLine = (isSingleton, card, menu, setCount) => {
  if (!isSingleton)
    return;
  const isInDeck = card.count >= 1;

  if (isInDeck) {
    menu.append(
      new MenuItem({ click() { setCount(card, 0); }, label: 'Remove From Deck' }),
    );
  } else {
    menu.append(
      new MenuItem({ click() { setCount(card, 1); }, label: 'Add to Deck' }),
    );
  }
};

export default getDeckLine;
