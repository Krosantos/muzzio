import path from 'path';
import { remote } from 'electron';
import settings from 'electron-settings';
import { AUTOSAVE, CURRENT_FILE_SETTING } from '@constants';
import setWindowTitle from '@utils/setWindowTitle';
import useLoad from './useLoad';

const { app } = remote;

// eslint-disable-next-line max-statements
const useAutoLoad = () => {
	let readPath = '';
	const hasCurrentFile = settings.has(CURRENT_FILE_SETTING);

	if (hasCurrentFile) {
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
