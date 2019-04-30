import React, { useContext } from 'react';
import { CardContext } from '@contexts/Card';

const List = () => {
	const { cards } = useContext(CardContext);

	return (
		<div>
			{Object.keys(cards)}
		</div>
	);
};

export default List;
