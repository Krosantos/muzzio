import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import Search from '@components/Search';
import useCommander from '@hooks/useCommander';
import CardList from '@components/CardList';
import { ANY_PARTNER, SPECIFIC_PARTNER } from '@constants';

const BASE_PARTNER_QUERY = ' t:legendary t:creature o:Partner';
const DEFAULT_PLACEHOLDER = 'Search for Partner';
const eligibleTypes = [ANY_PARTNER, SPECIFIC_PARTNER];

type PartnerSearchProps = {
  closeModal: ()=>void;
}
const PartnerSearch:React.FC<PartnerSearchProps> = ({ closeModal }) => {
  const [results, setResults] = useState([]);
  const {
    partner,
    setPartner,
    partnerQuery,
  } = useCommander();
  const wrappedSetPartner = useCallback((card) => {
    setPartner(card);
    closeModal();
  }, [closeModal, setPartner]);
  const placeholder = useMemo(() => get(partner, 'name', DEFAULT_PLACEHOLDER), [partner]);
  const { type, query } = partnerQuery;

  if (!eligibleTypes.includes(type))
    return null;
  const finalQuery = `${BASE_PARTNER_QUERY} ${query}`;

  return (
    <Section>
      <Search
        additionalConstraint={finalQuery}
        bypassIdentity
        placeholder={placeholder}
        setResults={setResults}
      />
      <List>
        <CardList alwaysColorful callback={wrappedSetPartner} cards={results} />
      </List>
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  margin-right: 8px;
`;

const List = styled.div`
  margin-top: 4px;
  overflow-y: auto;
  height: calc(100% - 1.5em);
`;

export default PartnerSearch;
