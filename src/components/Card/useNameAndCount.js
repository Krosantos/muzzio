import { useMemo } from 'react';
import get from 'lodash/get';
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

const useNameAndCount = (card, useMaindeckCount, useSideboardCount) => {
	const {
		attributes,
		count,
		name,
		sideboardCount,
	} = card;

	// eslint-disable-next-line complexity, max-statements
	const nameAndCount = useMemo(() => {
		if (useMaindeckCount)
			return getMaindeckCount(count, name);
		if (useSideboardCount)
			return getSideboardCount(sideboardCount, name);

		const inDeck = get(attributes, IS_IN_DECK, false);
		const inSideboard = get(attributes, IS_IN_SIDEBOARD, false);

		if (inDeck && inSideboard)
			return `${count} - (${sideboardCount}) ${name}`;
		if (inDeck)
			return `${count} ${name}`;
		if (inSideboard)
			return `(${sideboardCount}) ${name}`;
		return name;
	}, [
		name,
		count,
		sideboardCount,
		attributes[IS_IN_DECK],
		attributes[IS_IN_SIDEBOARD],
	]);

	return nameAndCount;
};

export default useNameAndCount;
