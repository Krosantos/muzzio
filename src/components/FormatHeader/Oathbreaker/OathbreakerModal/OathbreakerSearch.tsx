import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import get from "lodash/get";
import Search from "@components/Search";
import CardList from "@components/CardList";
import { useOathbreaker } from "@contexts/Oathbreaker";

const OATHBREAKER_QUERY = "-t:creature t:planeswalker";
const DEFAULT_PLACEHOLDER = "Search for Oathbreaker";

const OathbreakerSearch: React.FC = () => {
  const [results, setResults] = useState([]);
  const oathbreaker = useOathbreaker((s) => s.oathbreaker);
  const setOathbreaker = useOathbreaker((s) => s.setOathbreaker);
  const wrappedSetOathbreaker = useCallback(
    (card) => {
      const toSet = { ...card, attributes: {}, disableMenu: true };

      setOathbreaker(toSet);
    },
    [setOathbreaker],
  );
  const placeholder = useMemo(
    () => get(oathbreaker, "name", DEFAULT_PLACEHOLDER),
    [oathbreaker],
  );

  return (
    <Section>
      <Search
        additionalConstraint={OATHBREAKER_QUERY}
        autoFocus
        bypassIdentity
        placeholder={placeholder}
        setResults={setResults}
      />
      <List>
        <CardList alwaysColorful callback={wrappedSetOathbreaker} cards={results} />
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

export default OathbreakerSearch;
