import React, { useCallback, useMemo, useState } from 'react';
import get from 'lodash/get';
import Search from '@components/Search';
import useOathbreaker from '@hooks/useOathbreaker';
import CardList from '@components/CardList';
import { cardList, searchSection } from '../styles.scss';

const SIGNATURE_SPELL_QUERY = ' (t:instant OR t:sorcery)';
const DEFAULT_PLACEHOLDER = 'Search for Signature Spell';

const SignatureSearch = ({ closeModal }) => {
  const [results, setResults] = useState([]);
  const {
    colorIdentity,
    signatureSpell,
    setSignatureSpell,
  } = useOathbreaker();
  const wrappedSetPartner = useCallback((card) => {
    setSignatureSpell(card);
    closeModal();
  }, [closeModal, setSignatureSpell]);
  const identity = useMemo(() => `identity:${colorIdentity.join('')}`, [colorIdentity]);
  const placeholder = useMemo(() => get(signatureSpell, 'name', DEFAULT_PLACEHOLDER), [signatureSpell]);
  const finalQuery = `${SIGNATURE_SPELL_QUERY} ${identity}`;

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

export default SignatureSearch;
