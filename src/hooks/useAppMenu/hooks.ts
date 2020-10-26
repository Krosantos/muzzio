import path from 'path';
import { useCallback, useContext } from 'react';
import getList from '@api/getList';
import { SettingsContext } from '@contexts/Settings';
import useSave from '@hooks/useSave';
import useLoad from '@hooks/useLoad';
import useFormat from '@hooks/useFormat';
import useOverwrite from '@hooks/useOverwrite';
import useCards from '@hooks/useCards';
import setWindowTitle from '@utils/setWindowTitle';
import { CURRENT_FILE_SETTING, OPEN_FOLDER_SETTING } from '@constants';
import SaveData from '@hooks/SaveData';

const { app, dialog } = require('electron').remote;

type UseSaveDeck = (saveAs?:boolean)=>()=>void
const useSaveDeck:UseSaveDeck = (saveAs = false) => {
  const save = useSave();
  const { setSettings, settings } = useContext(SettingsContext);
  const saveDeck = useCallback(() => {
    const needsChoosing = saveAs || !settings[CURRENT_FILE_SETTING];
    const filepath = needsChoosing ? dialog.showSaveDialog({
      defaultPath: app.getPath('documents'),
      filters: [
        { extensions: ['muz'], name: 'Deck Files' },
        { extensions: ['*'], name: 'All Files' },
      ],
    }) : settings[CURRENT_FILE_SETTING];

    save(filepath);
    setWindowTitle(filepath);
    setSettings(CURRENT_FILE_SETTING, filepath);
  }, [save, saveAs, setSettings, settings]);

  return saveDeck;
};

type UseLoadDeck = ()=>()=>Promise<void>
const useLoadDeck:UseLoadDeck = () => {
  const load = useLoad();
  const { setSettings, settings } = useContext(SettingsContext);
  const overwrite = useOverwrite();
  const loadDeck = useCallback(async () => {
    const openPath = settings[OPEN_FOLDER_SETTING] || app.getPath('documents');
    const { filePaths } = await dialog.showOpenDialog({
      defaultPath: openPath,
      filters: [
        { extensions: ['muz'], name: 'Deck Files' },
        { extensions: ['*'], name: 'All Files' },
      ],
    });
    const filepath = filePaths[0];
    const saveData = load(filepath);

    overwrite(saveData);
    setWindowTitle(filepath);
    setSettings(CURRENT_FILE_SETTING, filepath);
    setSettings(OPEN_FOLDER_SETTING, path.dirname(filepath));
  }, [load, overwrite, setSettings, settings]);

  return loadDeck;
};

type UseNewDeck = () =>()=>void
const useNewDeck:UseNewDeck = () => {
  const overwrite = useOverwrite();
  const { format } = useFormat();
  const { setSettings } = useContext(SettingsContext);
  const newDeck = useCallback(() => {
    setWindowTitle();
    setSettings(CURRENT_FILE_SETTING, null);
    overwrite({ format });
  }, [format, overwrite, setSettings]);

  return newDeck;
};

type UseChangeFormat=()=>(format:SaveData["format"])=>void
const useChangeFormat:UseChangeFormat = () => {
  const overwrite = useOverwrite();
  const { setSettings } = useContext(SettingsContext);
  const changeFormat = useCallback((format) => () => {
    setWindowTitle();
    setSettings(CURRENT_FILE_SETTING, null);
    overwrite({ format });
  }, [overwrite, setSettings]);

  return changeFormat;
};

type UseRefreshCards = ()=>()=>Promise<void>
const useRefreshCards:UseRefreshCards = () => {
  const { cards, addCard } = useCards();

  const refreshCards = useCallback(async () => {
    const identifiers = Object.keys(cards).map((id) => ({ id }));
    const newCards = await getList(identifiers);

    newCards.forEach((card: Card) => addCard(card));
  }, [addCard, cards]);

  return refreshCards;
};

export {
  useSaveDeck,
  useLoadDeck,
  useNewDeck,
  useChangeFormat,
  useRefreshCards,
};
