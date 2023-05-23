import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import get from "lodash/get";
import Search from "@components/Search";
import useCommander from "@hooks/useCommander";
import CardList from "@components/CardList";
import {
  ANY_PARTNER,
  BACKGROUND_PARTNER,
  FRIENDS_FOREVER,
  SPECIFIC_PARTNER,
} from "@constants";

const BASE_PARTNER_QUERY = " is:commander o:Partner";
const BACKGROUND_QUERY = " t:background";
const DEFAULT_PLACEHOLDER = "Search for Partner";
const eligibleTypes = [
  ANY_PARTNER,
  SPECIFIC_PARTNER,
  BACKGROUND_PARTNER,
  FRIENDS_FOREVER,
];

const getPartnerQuery = ({ type, query = "" }: Card["partnerQuery"]): string => {
  switch (type) {
    case ANY_PARTNER:
    case SPECIFIC_PARTNER:
      return `${BASE_PARTNER_QUERY} ${query}`;
    case FRIENDS_FOREVER:
      return query;
    case BACKGROUND_PARTNER:
      return BACKGROUND_QUERY;
    default:
      return BASE_PARTNER_QUERY;
  }
};

type PartnerSearchProps = {
  closeModal: () => void;
};
const PartnerSearch: React.FC<PartnerSearchProps> = ({ closeModal }) => {
  const [results, setResults] = useState([]);
  const { partner, setPartner, partnerQuery } = useCommander();
  const wrappedSetPartner = useCallback(
    (card) => {
      setPartner(card);
      closeModal();
    },
    [closeModal, setPartner],
  );
  const placeholder = useMemo(() => get(partner, "name", DEFAULT_PLACEHOLDER), [partner]);

  if (!partnerQuery || !eligibleTypes.includes(partnerQuery.type)) return null;
  const constraint = getPartnerQuery(partnerQuery);

  return (
    <Section>
      <Search
        additionalConstraint={constraint}
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
