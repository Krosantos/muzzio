import React, { useState, useCallback } from 'react';
import search from '@api/search';
import { searchBox } from './styles.scss';

const Search = ({
	additionalConstraint = '',
	setResults,
	placeholder,
}) => {
	const [value, setValue] = useState('');
	const updateValue = useCallback((event) => {
		setValue(event.target.value);
	});
	const onEnter = useCallback(async ({ key }) => {
		if (key !== 'Enter')
			return;
		const searchResults = await search(`${value} ${additionalConstraint}`);

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
