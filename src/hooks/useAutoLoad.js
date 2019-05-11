import path from 'path';
import { remote } from 'electron';
import { AUTOSAVE } from '@constants';
import useLoad from './useLoad';

const { app } = remote;

const useAutoLoad = () => {
	const basePath = app.getPath('userData');
	const readPath = path.join(basePath, AUTOSAVE);

	const load = useLoad();

	return load(readPath);
};

export default useAutoLoad;
