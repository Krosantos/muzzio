import React, { useState, useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/CommanderContext';
import search from '@api/search';

const Search = () => {
	const [value, setValue] = useState('');
	const [commander] = useContext(CommanderContext);
	const updateValue = useCallback((event) => {
		setValue(event.target.value);
	});
	const onEnter = useCallback(({ key }) => {
		if (key !== 'Enter')
			return;
		search(value, commander);
	});

	return (
		<input onChange={updateValue} onKeyPress={onEnter} value={value} />
	);
};

export default Search;
