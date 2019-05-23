import fs from 'fs';
import { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import { OathbreakerContext } from '@contexts/Oathbreaker';
import { CardContext } from '@contexts/Card';
import { AttributesContext } from '@contexts/Attributes';
import { BasicLandContext } from '@contexts/BasicLand';
import { FormatContext } from '@contexts/Format';

const useAllContexts = () => {
	const { attributes } = useContext(AttributesContext);
	const { cards } = useContext(CardContext);
	const { commanderData } = useContext(CommanderContext);
	const { oathbreakerData } = useContext(OathbreakerContext);
	const { basicLand } = useContext(BasicLandContext);
	const { format } = useContext(FormatContext);

	return {
		attributes,
		basicLand,
		cards,
		commanderData,
		format,
		oathbreakerData,
	};
};

const useSave = () => {
	const allData = useAllContexts();

	const save = useCallback((filePath) => {
		fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
	}, [allData]);

	return save;
};

export default useSave;
