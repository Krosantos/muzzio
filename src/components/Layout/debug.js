import React from 'react';

import useCards from '@hooks/useCards';

const Debug = () => {
	const { cards } = useCards();

	return (
		<pre>{JSON.stringify(cards, null, 2)}</pre>
	);
};

export default Debug;
