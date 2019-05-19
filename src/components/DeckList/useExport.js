import { useCallback, useMemo } from 'react';
import { remote } from 'electron';

const { clipboard } = remote;
const STARTS_WITH_NUMBER = /^\d/;

const formatCards = (cards) => {
	const names = cards.map(({ name }) => {
		if (!name.match(STARTS_WITH_NUMBER))
			return `1 ${name}`;
		return name;
	});

	return names.join('\r\n');
};

const useExport = (cards = []) => {
	const toWrite = useMemo(() => formatCards(cards), [cards]);
	const exportList = useCallback(async () => {
		clipboard.writeText(toWrite);
	});

	return exportList;
};

export default useExport;
