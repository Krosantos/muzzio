import { useCallback, useMemo } from 'react';
import { remote } from 'electron';

const { clipboard } = remote;

const formatCards = (cards) => {
	const names = cards.map(({ name, count = 1 }) => `${count} ${name}`);

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
