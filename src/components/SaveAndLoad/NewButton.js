import React, { useCallback } from 'react';
import useOverwrite from '@hooks/useOverwrite';
import { saveLoadButton } from './styles.scss';

const NEW = 'New';

const NewButton = () => {
	const overwrite = useOverwrite();
	const newDeck = useCallback((event) => {
		event.preventDefault();
		overwrite({});
	});

	return (
		<button
			className={saveLoadButton}
			onClick={newDeck}
			type="button"
		>
			{NEW}
		</button>
	);
};

export default NewButton;
