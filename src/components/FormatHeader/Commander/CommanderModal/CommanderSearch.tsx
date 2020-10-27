import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import get from "lodash/get";
import Search from "@components/Search";
import useCommander from "@hooks/useCommander";
import CardList from "@components/CardList";
import { NO_PARTNER } from "@constants";

const LEGENDARY_CREATURE_QUERY = "is:commander";
const DEFAULT_PLACEHOLDER = "Search for Commander";

type CommanderSearchProps = {
  closeModal: () => void;
};
const CommanderSearch: React.FC<CommanderSearchProps> = ({ closeModal }) => {
  const [results, setResults] = useState([]);
  const { commander, setCommander } = useCommander();
  const wrappedSetCommander = useCallback(
    (card) => {
      const partnerType = get(card, "partnerQuery.type", NO_PARTNER);
      const toSet = { ...card, attributes: {}, disableMenu: true };

      setCommander(toSet);
      if (partnerType === NO_PARTNER) closeModal();
    },
    [closeModal, setCommander],
  );
  const placeholder = useMemo(() => get(commander, "name", DEFAULT_PLACEHOLDER), [
    commander,
  ]);

  return (
    <Section>
      <Search
        additionalConstraint={LEGENDARY_CREATURE_QUERY}
        autoFocus
        bypassIdentity
        placeholder={placeholder}
        setResults={setResults}
      />
      <List>
        <CardList alwaysColorful callback={wrappedSetCommander} cards={results} />
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

export default CommanderSearch;
