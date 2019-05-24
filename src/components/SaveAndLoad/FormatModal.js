import React, { useCallback } from 'react';
import useOverwrite from '@hooks/useOverwrite';

const FormatModal = () => {
	const overwrite = useOverwrite();
	const newDeck = useCallback((event) => {
		event.preventDefault();
		overwrite({});
	});

	return (
		<div />
	);
};

export default FormatModal;
