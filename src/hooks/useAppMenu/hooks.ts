import path from "path";
import { useCallback, useContext } from "react";
import getList from "@api/getList";
import { SettingsContext } from "@contexts/Settings";
import useSave from "@hooks/useSave";
import useLoad from "@hooks/useLoad";
import useOverwrite from "@hooks/useOverwrite";
import setWindowTitle from "@utils/setWindowTitle";
import { CURRENT_FILE_SETTING, OPEN_FOLDER_SETTING } from "@constants";
import SaveData from "@hooks/SaveData";
import { useFormat } from "@contexts/Format";
import { useCards } from "@contexts/Card";

const { app, dialog } = require("electron").remote;

type UseSaveDeck = (saveAs?: boolean) => () => void;
const useSaveDeck: UseSaveDeck = (saveAs = false) => {
  const save = useSave();
  const { setSettings, settings } = useContext(SettingsContext);
  const saveDeck = useCallback(() => {
    const needsChoosing = saveAs || !settings[CURRENT_FILE_SETTING];
    const filepath = needsChoosing
      ? dialog
          .showSaveDialogSync({
            defaultPath: app.getPath("documents"),
            filters: [
              { extensions: ["muz"], name: "Deck Files" },
              { extensions: ["*"], name: "All Files" },
            ],
          })
          .toString()
      : settings[CURRENT_FILE_SETTING].toString();

    save(filepath);
    setWindowTitle(filepath);
    setSettings(CURRENT_FILE_SETTING, filepath);
    setSettings(OPEN_FOLDER_SETTING, path.dirname(filepath));
  }, [save, saveAs, setSettings, settings]);

  return saveDeck;
};

type UseLoadDeck = () => () => Promise<void>;
const useLoadDeck: UseLoadDeck = () => {
  const load = useLoad();
  const { setSettings, settings } = useContext(SettingsContext);
  const overwrite = useOverwrite();
  const loadDeck = useCallback(async () => {
    const openPath = settings[OPEN_FOLDER_SETTING] || app.getPath("documents");
    const { filePaths } = await dialog.showOpenDialog({
      defaultPath: openPath.toString(),
      filters: [
        { extensions: ["muz"], name: "Deck Files" },
        { extensions: ["*"], name: "All Files" },
      ],
    });
    const filepath = filePaths[0];

    if (!filepath) return;
    const saveData = load(filepath);

    overwrite(saveData);
    setWindowTitle(filepath);
    setSettings(CURRENT_FILE_SETTING, filepath);
    setSettings(OPEN_FOLDER_SETTING, path.dirname(filepath));
  }, [load, overwrite, setSettings, settings]);

  return loadDeck;
};

type UseNewDeck = () => () => void;
const useNewDeck: UseNewDeck = () => {
  const overwrite = useOverwrite();
  const format = useFormat((s) => s.format);
  const { setSettings } = useContext(SettingsContext);
  const newDeck = useCallback(() => {
    setWindowTitle();
    setSettings(CURRENT_FILE_SETTING, null);
    overwrite({ format });
  }, [format, overwrite, setSettings]);

  return newDeck;
};

type UseChangeFormat = () => (format: SaveData["format"]) => void;
const useChangeFormat: UseChangeFormat = () => {
  const overwrite = useOverwrite();
  const { setSettings } = useContext(SettingsContext);
  const changeFormat = useCallback(
    (format) => () => {
      setWindowTitle();
      setSettings(CURRENT_FILE_SETTING, null);
      overwrite({ format });
    },
    [overwrite, setSettings],
  );

  return changeFormat;
};

type UseRefreshCards = () => () => Promise<void>;
const useRefreshCards: UseRefreshCards = () => {
  const cards = useCards((s) => s.cardData);
  const addCard = useCards((s) => s.addCard);

  const refreshCards = useCallback(async () => {
    const identifiers = Object.keys(cards).map((name) => {
      const card = cards[name];

      return { name: card.name };
    });
    const newCards = await getList(identifiers);

    newCards.forEach((card: Card) => addCard(card));
  }, [addCard, cards]);

  return refreshCards;
};

type UseRemoveCards = () => () => void;
const useRemoveCards: UseRemoveCards = () => {
  const removeCards = useCards((s) => s.clearDeck);
  return removeCards;
};

export {
  useSaveDeck,
  useLoadDeck,
  useNewDeck,
  useChangeFormat,
  useRefreshCards,
  useRemoveCards,
};
