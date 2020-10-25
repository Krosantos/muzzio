import { useContext, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import assign from 'lodash/assign';
import { OathbreakerContext, OathbreakerData } from '@contexts/Oathbreaker';

type CalculateIdentity = (oathbreakerData:OathbreakerData)=>string[]
const calculateIdentity:CalculateIdentity = (oathbreakerData) => {
  const identity = get(oathbreakerData, 'oathbreaker.identity', []);

  if (identity.length < 1)
    identity.push('C');
  return identity;
};

type UseOathbreaker = ()=>{
  colorIdentity: string[];
  oathbreaker:Card;
  setOathbreaker:(oathbreaker:Card)=>void;
  setSignatureSpell:(signatureSpell:Card)=>void;
  signatureSpell:Card;
}
const useOathbreaker:UseOathbreaker = () => {
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
