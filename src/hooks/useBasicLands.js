import { useContext, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import { identityMap, IS_IN_DECK } from '@constants';
import { BasicLandContext } from '@contexts/BasicLand';

// eslint-disable-next-line max-lines-per-function
const useBasicLand = (identity) => {
	const { basicLand, setBasicLand } = useContext(BasicLandContext);

	const count = useMemo(() => get(basicLand, identity, 0), [basicLand]);

	const setCount = useCallback((event) => {
		const newCount = get(event, 'target.value', 0);
		const toSet = { ...basicLand };

		toSet[identity] = newCount;

		setBasicLand(toSet);
	}, [basicLand]);

	const totalCount = useMemo(() => {
		let result = 0;

		Object.keys(basicLand).forEach((key) => {
			const raw = get(basicLand, key, 0);

			if (!raw)
				return;
			const toAdd = parseInt(raw, 10);

			result += toAdd;
		});
		return result;
	}, [basicLand]);

	const asCards = useMemo(() => {
		const result = [];

		forEach(basicLand, (landCount, landIdentity) => {
			const base = identityMap[landIdentity];
			const { name } = base;
			const toPush = {
				...base,
				attributes: { [IS_IN_DECK]: true },
				disableMenu: true,
				name: `${landCount} ${name}`,
			};

			result.push(toPush);
		});
		return result;
	}, [basicLand]);

	return {
		asCards,
		count,
		setCount,
		totalCount,
	};
};

export default useBasicLand;
