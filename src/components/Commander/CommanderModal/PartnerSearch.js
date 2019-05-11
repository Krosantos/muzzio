import React, { useCallback, useState } from 'react';
import Search from '@components/Search';
import useCommander from '@hooks/useCommander';
import CardList from '@components/CardList';
import { ANY_PARTNER, SPECIFIC_PARTNER } from '@constants';
import { cardList, searchSection } from '../styles.scss';

const BASE_PARTNER_QUERY = ' t:legendary t:creature o:Partner';
const eligibleTypes = [ANY_PARTNER, SPECIFIC_PARTNER];

// eslint-disable-next-line max-statements
const PartnerSearch = ({ closeModal }) => {
	const [results, setResults] = useState([]);
	const {	commander, setPartner, partnerQuery = {} } = useCommander();
	const wrappedSetPartner = useCallback((card) => {
		setPartner(card);
		closeModal();
	}, [commander]);
	const { type, query } = partnerQuery;

	if (!eligibleTypes.includes(type))
		return null;
	const finalQuery = `${BASE_PARTNER_QUERY} ${query}`;

	return (
		<div className={searchSection}>
			<Search
				additionalConstraint={finalQuery}
				placeholder="Search for partners"
				setResults={setResults}
			/>
			<div className={cardList}>
				<CardList callback={wrappedSetPartner} cards={results} />
			</div>
		</div>
	);
};

export default PartnerSearch;
