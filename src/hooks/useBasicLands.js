import { useContext, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import { BasicLandContext } from '@contexts/BasicLand';

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

	return {
		count,
		setCount,
		totalCount,
	};
};

export default useBasicLand;
