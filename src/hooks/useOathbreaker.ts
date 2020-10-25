import { useContext, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import assign from 'lodash/assign';
import { OathbreakerContext } from '@contexts/Oathbreaker';

const calculateIdentity = (oathbreakerData) => {
  const identity = get(oathbreakerData, 'oathbreaker.identity', []);

  if (identity.length < 1)
    identity.push('C');
  return identity;
};

const useOathbreaker = () => {
  const { oathbreakerData, setOathbreakerData } = useContext(OathbreakerContext);

  const setOathbreaker = useCallback((oathbreaker) => {
    const toSet = assign({}, oathbreakerData, { oathbreaker, signatureSpell: {} });

    setOathbreakerData(toSet);
  }, [oathbreakerData, setOathbreakerData]);

  const setSignatureSpell = useCallback((signatureSpell) => {
    const toSet = assign({}, oathbreakerData, { signatureSpell });

    setOathbreakerData(toSet);
  }, [oathbreakerData, setOathbreakerData]);

  const colorIdentity = useMemo(() => calculateIdentity(oathbreakerData), [oathbreakerData]);
  const oathbreaker = useMemo(() => get(oathbreakerData, 'oathbreaker'), [oathbreakerData]);
  const signatureSpell = useMemo(() => get(oathbreakerData, 'signatureSpell'), [oathbreakerData]);

  return {
    colorIdentity,
    oathbreaker,
    setOathbreaker,
    setSignatureSpell,
    signatureSpell,
  };
};

export default useOathbreaker;
