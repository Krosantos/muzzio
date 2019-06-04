import React, { useMemo } from 'react';
import useFormat from '@hooks/useFormat';
import useCards from '@hooks/useCards';
import { IS_IN_SIDEBOARD } from '@constants';
import { divider } from './styles.scss';

const Divider = ({ label }) => {
	const { isSingleton } = useFormat();
	const { cardsByAttribute } = useCards();
	const shouldHideDivider = useMemo(() => {
		if (isSingleton)
			return true;
		const sideboardCards = cardsByAttribute(IS_IN_SIDEBOARD);

		return sideboardCards.length <= 0;
	}, [isSingleton, cardsByAttribute]);

	if (shouldHideDivider)
		return null;
	return (
		<div className={divider}>
			{label}
		</div>
	);
};

export default Divider;
