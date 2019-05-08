import path from 'path';
import { useEffect } from 'react';
import { remote } from 'electron';
import useSave from './useSave';

const { app } = remote;
const FILE_NAME = 'autosave';

const useAutoSave = () => {
	const basePath = app.getPath('userData');
	const writePath = path.join(basePath, FILE_NAME);
	const save = useSave(writePath);

	useEffect(() => {
		const autoSave = setInterval(save, 10000);

		return () => clearInterval(autoSave);
	});
};

export default useAutoSave;
