import { useEffect } from 'react';
import remote from '@electron/remote';
import generateTemplate from './generateTemplate';
import {
  useNewDeck,
  useSaveDeck,
  useLoadDeck,
  useChangeFormat,
  useRefreshCards,
} from './hooks';

const { Menu } = remote;

const useAppMenu = () => {
  const callbacks = {
    changeFormat: useChangeFormat(),
    loadDeck: useLoadDeck(),
    newDeck: useNewDeck(),
    refreshCards: useRefreshCards(),
    saveDeck: useSaveDeck(),
    saveDeckAs: useSaveDeck(true),
  };

  useEffect(() => {
    const template = generateTemplate(callbacks);
    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
  });
};

export default useAppMenu;
