/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback } from 'react';
import search from '@api/search';
import useQueryConstraints from './useQueryConstraints';
import { searchBox } from './styles.scss';

const Search = ({
	additionalConstraint = '',
	autoFocus = false,
	bypassIdentity,
	setResults,
	placeholder,
}) => {
	const [value, setValue] = useState('');
	const updateValue = useCallback((event) => {
		setValue(event.target.value);
	});
	const constraint = useQueryConstraints(bypassIdentity);
	const onEnter = useCallback(async ({ key }) => {
		if (key !== 'Enter')
			return;
		const searchResults = await search(`${value} ${constraint} ${additionalConstraint}`);

		setResults(searchResults);
	});

	return (
		<input
			autoFocus={autoFocus}
			className={searchBox}
			onChange={updateValue}
			onKeyPress={onEnter}
			placeholder={placeholder}
			value={value}
		/>
	);
};

export default Search;
