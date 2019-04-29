import React, { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';

const Commander = () => {
	const [currentCommander, setCommander] = useContext(CommanderContext);
	const changeGisa = useCallback(() => {
		setCommander({ identity: 'UB', name: 'Gisa' });
	});
	const changeXantcha = useCallback(() => {
		setCommander({ identity: 'BR', name: 'Xantcha' });
	});

	return (
		<div>
			<pre>{JSON.stringify(currentCommander)}</pre>
			<button onClick={changeGisa} type="button">Change to Gisa</button>
			<button onClick={changeXantcha} type="button">Change to Xantcha</button>
		</div>
	);
};

export default Commander;
