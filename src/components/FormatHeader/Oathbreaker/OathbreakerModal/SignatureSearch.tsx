import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import get from "lodash/get";
import Search from "@components/Search";
import CardList from "@components/CardList";
import { useOathbreaker } from "@contexts/Oathbreaker";

const SIGNATURE_SPELL_QUERY = " (t:instant OR t:sorcery)";
const DEFAULT_PLACEHOLDER = "Search for Signature Spell";

type SignatureSearchProps = {
  closeModal: () => void;
};
const SignatureSearch: React.FC<SignatureSearchProps> = ({ closeModal }) => {
  const [results, setResults] = useState([]);
  const colorIdentity = useOathbreaker((s) => s.colorIdentity);
  const signatureSpell = useOathbreaker((s) => s.signatureSpell);
  const setSignatureSpell = useOathbreaker((s) => s.setSignatureSpell);
  const wrappedSetPartner = useCallback(
    (card) => {
      setSignatureSpell(card);
      closeModal();
    },
    [closeModal, setSignatureSpell],
  );
  const identity = useMemo(() => `identity:${colorIdentity.join("")}`, [colorIdentity]);
  const placeholder = useMemo(
    () => get(signatureSpell, "name", DEFAULT_PLACEHOLDER),
    [signatureSpell],
  );
  const finalQuery = `${SIGNATURE_SPELL_QUERY} ${identity}`;

  return (
    <Section>
      <Search
        additionalConstraint={finalQuery}
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

export default SignatureSearch;
