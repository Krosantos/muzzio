import { useMemo } from 'react';
import get from 'lodash/get';
import { IS_IN_DECK, IS_IN_SIDEBOARD } from '@constants';

const useNameAndCount = (card) => {
	const {
		attributes,
		count,
		name,
		sideboardCount,
	} = card;

	// eslint-disable-next-line complexity
	const nameAndCount = useMemo(() => {
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
