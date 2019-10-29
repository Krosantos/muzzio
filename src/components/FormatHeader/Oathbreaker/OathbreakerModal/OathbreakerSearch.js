import React, { useCallback, useMemo, useState } from 'react';
import get from 'lodash/get';
import Search from '@components/Search';
import useOathbreaker from '@hooks/useOathbreaker';
import CardList from '@components/CardList';
import { cardList, searchSection } from '../styles.scss';

const OATHBREAKER_QUERY = '-t:creature t:planeswalker';
const DEFAULT_PLACEHOLDER = 'Search for Oathbreaker';

const OathbreakerSearch = () => {
	const [results, setResults] = useState([]);
	const {	oathbreaker, setOathbreaker } = useOathbreaker();
	const wrappedSetOathbreaker = useCallback((card) => {
		const toSet = { ...card, attributes: {}, disableMenu: true };

		setOathbreaker(toSet);
	}, [setOathbreaker]);
	const placeholder = useMemo(() => get(oathbreaker, 'name', DEFAULT_PLACEHOLDER), [oathbreaker]);

	return (
		<div className={searchSection}>
			<Search
				additionalConstraint={OATHBREAKER_QUERY}
				autoFocus
				bypassIdentity
				placeholder={placeholder}
				setResults={setResults}
			/>
			<div className={cardList}>
				<CardList alwaysColorful callback={wrappedSetOathbreaker} cards={results} />
			</div>
		</div>
	);
};

export default OathbreakerSearch;
