import path from 'path';
import fs from 'fs';
import { remote } from 'electron';
import settings from 'electron-settings';
import setWindowTitle from '@utils/setWindowTitle';
import { AUTOSAVE, CURRENT_FILE_SETTING } from '@constants';
import useLoad from './useLoad';

const { app } = remote;

const useAutoLoad = () => {
  let readPath = '';
  const currentFile = settings.get(CURRENT_FILE_SETTING);
  const currentFileExists = fs.existsSync(currentFile);

  if (currentFileExists && currentFile.length > 1) {
    readPath = settings.get(CURRENT_FILE_SETTING);
    setWindowTitle(readPath);
  } else {
    const basePath = app.getPath('userData');

    readPath = path.join(basePath, AUTOSAVE);
  }

  const load = useLoad();

  return load(readPath);
};

export default useAutoLoad;
