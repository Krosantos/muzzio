import React, { useState, useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import search from '@api/search';
import Card from '../Card';
import { searchResultContainer } from './styles.scss';

const Search = () => {
	const [value, setValue] = useState('');
	const [results, setResults] = useState([]);
	const { commander } = useContext(CommanderContext);
	const updateValue = useCallback((event) => {
		setValue(event.target.value);
	});
	const onEnter = useCallback(async ({ key }) => {
		if (key !== 'Enter')
			return;
		const searchResults = await search(value, commander);

		setResults(searchResults);
	});

	return (
		<>
			<input onChange={updateValue} onKeyPress={onEnter} value={value} />
			<div className={searchResultContainer}>
				{results.map((result) => (
					<Card key={result.name} {...result} />
				))}
			</div>
		</>
	);
};

export default Search;
