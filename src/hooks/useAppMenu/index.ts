import { useEffect, useMemo } from "react";
import generateTemplate from "./generateTemplate";
import {
  useNewDeck,
  useSaveDeck,
  useLoadDeck,
  useChangeFormat,
  useRefreshCards,
  useRemoveCards,
} from "./hooks";

const { Menu } = require("electron").remote;

type UseAppMenu = () => void;
const useAppMenu: UseAppMenu = () => {
  const changeFormat = useChangeFormat();
  const loadDeck = useLoadDeck();
  const newDeck = useNewDeck();
  const refreshCards = useRefreshCards();
  const removeCards = useRemoveCards();
  const saveDeck = useSaveDeck();
  const saveDeckAs = useSaveDeck(true);

  const callbacks = useMemo(
    () => ({
      changeFormat,
      loadDeck,
      newDeck,
      refreshCards,
      removeCards,
      saveDeck,
      saveDeckAs,
    }),
    [changeFormat, loadDeck, newDeck, refreshCards, removeCards, saveDeck, saveDeckAs],
  );

  useEffect(() => {
    const template = generateTemplate(callbacks);
    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
  }, [callbacks]);
};

export default useAppMenu;
