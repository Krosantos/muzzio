import fs from 'fs';
import { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import { CardContext } from '@contexts/Card';
import { AttributesContext } from '@contexts/Attributes';

const useAllContexts = () => {
	const { attributes } = useContext(AttributesContext);
	const { cards } = useContext(CardContext);
	const { commanderData } = useContext(CommanderContext);

	return {
		attributes,
		cards,
		commanderData,
	};
};

const useSave = (filePath) => {
	const allData = useAllContexts();

	const save = useCallback(() => {
		fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
	}, [allData, filePath]);

	return save;
};

export default useSave;
