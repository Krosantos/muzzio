import React from 'react';
import useSave from '@hooks/useSave';
import useAutoSave from '@hooks/useAutoSave';

const SAVE = 'Save';

const SaveButton = () => {
	const save = useSave('neat.json');

	useAutoSave();
	return (
		<button onClick={save} type="button">{SAVE}</button>
	);
};

export default SaveButton;
