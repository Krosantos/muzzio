import { useContext, useMemo, useCallback } from 'react';
import { FormatProvider } from '@contexts/Format';
import { formats } from '@constants';

const useFormat = () => {
	const { format: innerFormat, setFormat: innerSet } = useContext(FormatProvider);
	const setFormat = useCallback((formatToSet) => {
		if (formats.includes(formatToSet))
			innerSet(formatToSet);
	}, [innerSet]);
	const format = useMemo(() => innerFormat, [innerFormat]);

	return {
		format,
		setFormat,
	};
};

export default useFormat;
