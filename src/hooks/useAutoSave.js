import path from 'path';
import { useEffect } from 'react';
import { remote } from 'electron';
import { AUTOSAVE } from '@constants';
import useSave from './useSave';

const { app } = remote;

const useAutoSave = () => {
	const basePath = app.getPath('userData');
	const writePath = path.join(basePath, AUTOSAVE);
	const save = useSave(writePath);

	useEffect(() => {
		const autoSave = setInterval(save, 10000);

		return () => clearInterval(autoSave);
	});
};

export default useAutoSave;
