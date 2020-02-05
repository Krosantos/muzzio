import fs from 'fs';
import { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import { OathbreakerContext } from '@contexts/Oathbreaker';
import { CardContext } from '@contexts/Card';
import { AttributesContext } from '@contexts/Attributes';
import { FormatContext } from '@contexts/Format';

const useAllContexts = () => {
	const { attributes } = useContext(AttributesContext);
	const { cards } = useContext(CardContext);
	const { commanderData } = useContext(CommanderContext);
	const { oathbreakerData } = useContext(OathbreakerContext);
	const { format } = useContext(FormatContext);

	return {
		attributes,
		cards,
		commanderData,
		format,
		oathbreakerData,
	};
};

const useSave = () => {
	const allData = useAllContexts();

	const save = useCallback((filePath) => {
		// const fileContents = Buffer.from(JSON.stringify(allData), 'utf8').toString('base64');
		const fileContents = JSON.stringify(allData);

		fs.writeFileSync(filePath, fileContents);
	}, [allData]);

	return save;
};

export default useSave;
