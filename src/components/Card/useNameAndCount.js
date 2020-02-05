import { useMemo } from 'react';
import useFormat from '@hooks/useFormat';

const getMaindeckCount = (count, name) => {
	if (count > 0)
		return `${count} ${name}`;
	return name;
};

const getSideboardCount = (sideboardCount, name) => {
	if (sideboardCount > 0)
		return `${sideboardCount} ${name}`;
	return name;
};

const getSingletonCount = (count, name) => {
	if (count > 1)
		return `${count} ${name}`;
	return name;
};

const useNameAndCount = (card, useMaindeckCount, useSideboardCount) => {
	const {
		count,
		name,
		sideboardCount,
	} = card;
	const { isSingleton } = useFormat();

	// eslint-disable-next-line complexity
	const nameAndCount = useMemo(() => {
		if (isSingleton)
			return getSingletonCount(count, name);
		if (useMaindeckCount)
			return getMaindeckCount(count, name);
		if (useSideboardCount)
			return getSideboardCount(sideboardCount, name);

		const inDeck = count > 0;
		const inSideboard = sideboardCount > 0;

		if (inDeck && inSideboard)
			return `${count} - (${sideboardCount}) ${name}`;
		if (inDeck)
			return `${count} ${name}`;
		if (inSideboard)
			return `(${sideboardCount}) ${name}`;
		return name;
	}, [count, isSingleton, name, sideboardCount, useMaindeckCount, useSideboardCount]);

	return nameAndCount;
};

export default useNameAndCount;
