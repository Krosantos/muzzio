import React, { useCallback, useMemo, useState } from 'react';
import get from 'lodash/get';
import Search from '@components/Search';
import useCommander from '@hooks/useCommander';
import CardList from '@components/CardList';
import { ANY_PARTNER, SPECIFIC_PARTNER } from '@constants';
import { cardList, searchSection } from '../styles.scss';

const BASE_PARTNER_QUERY = ' t:legendary t:creature o:Partner';
const DEFAULT_PLACEHOLDER = 'Search for Partner';
const eligibleTypes = [ANY_PARTNER, SPECIFIC_PARTNER];

// eslint-disable-next-line max-statements
const PartnerSearch = ({ closeModal }) => {
	const [results, setResults] = useState([]);
	const {
		commander,
		partner,
		setPartner,
		partnerQuery = {},
	} = useCommander();
	const wrappedSetPartner = useCallback((card) => {
		setPartner(card);
		closeModal();
	}, [commander]);
	const placeholder = useMemo(() => get(partner, 'name', DEFAULT_PLACEHOLDER), [partner]);
	const { type, query } = partnerQuery;

	if (!eligibleTypes.includes(type))
		return null;
	const finalQuery = `${BASE_PARTNER_QUERY} ${query}`;

	return (
		<div className={searchSection}>
			<Search
				additionalConstraint={finalQuery}
				placeholder={placeholder}
				setResults={setResults}
			/>
			<div className={cardList}>
				<CardList alwaysColorful callback={wrappedSetPartner} cards={results} />
			</div>
		</div>
	);
};

export default PartnerSearch;
