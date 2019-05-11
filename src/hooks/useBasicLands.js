import { useContext, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import { BasicLandContext } from '@contexts/BasicLand';

const useBasicLand = (identity) => {
	const { BasicLand, setBasicLand } = useContext(BasicLandContext);

	const count = useMemo(() => get(BasicLand, identity, 0), [BasicLand]);
	const setCount = useCallback((event) => {
		const newCount = get(event, 'target.value', 0);
		const toSet = { ...BasicLand };

		toSet[identity] = newCount;

		setBasicLand(toSet);
	}, [BasicLand]);
	const totalCount = useMemo(() => {
		let result = 0;

		Object.keys(BasicLand).forEach((key) => {
			const raw = get(BasicLand, key, 0);

			if (!raw)
				return;
			const toAdd = parseInt(raw, 10);

			result += toAdd;
		});
		return result;
	}, [BasicLand]);

	return {
		count,
		setCount,
		totalCount,
	};
};

export default useBasicLand;
