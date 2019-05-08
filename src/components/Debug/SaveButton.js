import React from 'react';
import useSaveFiles from '@hooks/useSaveFiles';

const SAVE = 'Save';

const SaveButton = () => {
	const save = useSaveFiles();

	return (
		<button onClick={save} type="button">{SAVE}</button>
	);
};

export default SaveButton;
