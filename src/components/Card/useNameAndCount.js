import { useMemo } from 'react';
import get from 'lodash/get';
import useFormat from '@hooks/useFormat';
import { IS_IN_DECK, IS_IN_SIDEBOARD } from '@constants';

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
		attributes,
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

		const inDeck = get(attributes, IS_IN_DECK, false) && count;
		const inSideboard = get(attributes, IS_IN_SIDEBOARD, false) && sideboardCount;

		if (inDeck && inSideboard)
			return `${count} - (${sideboardCount}) ${name}`;
		if (inDeck)
			return `${count} ${name}`;
		if (inSideboard)
			return `(${sideboardCount}) ${name}`;
		return name;
	}, [isSingleton, count, name, useMaindeckCount, useSideboardCount, sideboardCount, attributes]);

	return nameAndCount;
};

export default useNameAndCount;
