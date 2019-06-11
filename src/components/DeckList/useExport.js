import { useCallback, useMemo } from 'react';
import { remote } from 'electron';

const { clipboard } = remote;

const formatCards = (cards) => {
	const names = cards.map(({ name, count }) => `${count || 1} ${name}`);

	return names.join('\r\n');
};

const useExport = (maindeck = [], sideboard = []) => {
	const toWrite = useMemo(() => {
		const formattedMain = formatCards(maindeck);

		if (!sideboard.length)
			return formattedMain;
		const formattedSide = formatCards(sideboard);

		return `${formattedMain}\r\n\r\n${formattedSide}`;
	}, [maindeck, sideboard]);
	const exportList = useCallback(async () => {
		clipboard.writeText(toWrite);
	});

	return exportList;
};

export default useExport;
