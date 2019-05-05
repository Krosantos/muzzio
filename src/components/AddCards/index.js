import React, { useMemo, useState } from 'react';
import Search from '@components/Search';
import CardList from '@components/CardList';
import useCommander from '@hooks/useCommander';
import useCards from '@hooks/useCards';
import { cardList, searchSection } from './styles.scss';

const convertIdentityToQuery = (identity) => {
	if (!identity)
		return '';
	if (!identity.length)
		return ' identity:c';
	return ` identity:${identity.join('')}`;
};

const AddCards = () => {
	const [results, setResults] = useState([]);
	const { colorIdentity } = useCommander();
	const { addCard } = useCards();
	const identityQuery = useMemo(() => convertIdentityToQuery(colorIdentity));

	return (
		<div className={searchSection}>
			<Search
				additionalConstraint={identityQuery}
				placeholder="Search for cards"
				setResults={setResults}
			/>
			<div className={cardList}>
				<CardList callback={addCard} cards={results} />
			</div>
		</div>
	);
};

export default AddCards;
