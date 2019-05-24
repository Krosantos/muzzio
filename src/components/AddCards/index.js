import React, { useState } from 'react';
import Search from '@components/Search';
import CardList from '@components/CardList';
import useCards from '@hooks/useCards';
import { cardList, searchSection } from './styles.scss';

const AddCards = () => {
	const [results, setResults] = useState([]);
	const { addCard } = useCards();

	return (
		<div className={searchSection}>
			<Search
				placeholder="Search for cards"
				setResults={setResults}
			/>
			<div className={cardList}>
				<CardList alwaysColorful callback={addCard} cards={results} />
			</div>
		</div>
	);
};

export default AddCards;
