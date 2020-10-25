import React, { useState, useMemo } from 'react';

type OathbreakerData = {
  oathbreaker: Card;
  signatureSpell: Card;
  identity: string[];
}
type OathbreakerContextValue = {
  oathbreakerData: OathbreakerData;
  setOathbreakerData: React.Dispatch<React.SetStateAction<OathbreakerData>>;
}
const OathbreakerContext = React.createContext<OathbreakerContextValue>();

type OathbreakerProviderProps = {
  initialValue?: OathbreakerData;
}
const OathbreakerProvider:React.FC<OathbreakerProviderProps> = ({ children, initialValue = {} }) => {
  const [oathbreakerData, setOathbreakerData] = useState<OathbreakerData>(initialValue);

  const value = useMemo<OathbreakerContextValue>(() => ({ oathbreakerData, setOathbreakerData }), [oathbreakerData]);

  return (
    <OathbreakerContext.Provider value={value}>
      {children}
    </OathbreakerContext.Provider>
  );
};

export { OathbreakerContext, OathbreakerProvider };
