import React, { useCallback, useState } from 'react';
import get from 'lodash/get';
import Search from '@components/Search';
import useCommander from '@hooks/useCommander';
import CardList from '@components/CardList';
import { NO_PARTNER } from '@constants';
import { cardList, searchSection } from '../styles.scss';

const LEGENDARY_CREATURE_QUERY = ' t:legendary t:creature';
const CommanderSearch = ({ closeModal }) => {
	const [results, setResults] = useState([]);
	const {	setCommander } = useCommander();
	const wrappedSetCommander = useCallback((card) => {
		const partnerType = get(card, 'partnerQuery.type', NO_PARTNER);
		const toSet = { ...card, attributes: {}, disableMenu: true };

		setCommander(toSet);
		if (partnerType === NO_PARTNER)
			closeModal();
	}, []);

	return (
		<div className={searchSection}>
			<Search
				additionalConstraint={LEGENDARY_CREATURE_QUERY}
				placeholder="Search for commanders"
				setResults={setResults}
			/>
			<div className={cardList}>
				<CardList alwaysColorful callback={wrappedSetCommander} cards={results} />
			</div>
		</div>
	);
};

export default CommanderSearch;
