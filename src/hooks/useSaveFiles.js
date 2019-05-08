import fs from 'fs';
import { remote } from 'electron';
import { useEffect, useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import { CardContext } from '@contexts/Card';
import { AttributesContext } from '@contexts/Attributes';

const { app } = remote;

const useAllContexts = () => {
	const { attributes } = useContext(AttributesContext);
	const { cards } = useContext(CardContext);
	const { commander } = useContext(CommanderContext);

	return {
		attributes,
		cards,
		commander,
	};
};

const useSaveFiles = () => {
	const pathOut = app.getPath('userData');
	const allData = useAllContexts();

	const save = useCallback(() => {
		fs.writeFileSync(`${pathOut}/hype.json`, JSON.stringify(allData, null, 2));
	}, [allData]);

	return save;
};

export default useSaveFiles;
