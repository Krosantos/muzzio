import React, { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';

const GISA_TEXT = 'Change to Gisa';
const XANTCHA_TEXT = 'Change to Xantcha';

const Commander = () => {
	const { commander, setCommander } = useContext(CommanderContext);
	const changeGisa = useCallback(() => {
		setCommander({ identity: 'UB', name: 'Gisa' });
	});
	const changeXantcha = useCallback(() => {
		setCommander({ identity: 'BR', name: 'Xantcha' });
	});

	return (
		<div>
			<pre>{JSON.stringify(commander)}</pre>
			<button onClick={changeGisa} type="button">{GISA_TEXT}</button>
			<button onClick={changeXantcha} type="button">{XANTCHA_TEXT}</button>
		</div>
	);
};

export default Commander;
