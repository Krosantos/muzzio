import React, { useState, useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import search from '@api/search';
import { searchBox } from './styles.scss';

const Search = ({
	additionalConstraint = '',
	setResults,
	ignoreCommander = false,
	placeholder,
}) => {
	const [value, setValue] = useState('');
	const { commander } = useContext(CommanderContext);
	const updateValue = useCallback((event) => {
		setValue(event.target.value);
	});
	const onEnter = useCallback(async ({ key }) => {
		if (key !== 'Enter')
			return;
		const searchResults = await search(value + additionalConstraint, ignoreCommander ? null : commander);

		setResults(searchResults);
	});

	return (
		<input
			className={searchBox}
			onChange={updateValue}
			onKeyPress={onEnter}
			placeholder={placeholder}
			value={value}
		/>
	);
};

export default Search;
