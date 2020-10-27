import React, { useState, useMemo } from "react";

type OathbreakerData = {
  oathbreaker?: Card;
  signatureSpell?: Card;
  colorIdentity: string[];
};
type OathbreakerContextValue = {
  oathbreakerData: OathbreakerData;
  setOathbreakerData: React.Dispatch<React.SetStateAction<OathbreakerData>>;
};

const DEFAULT_VALUE: OathbreakerContextValue = {
  oathbreakerData: {
    colorIdentity: ["c"],
  },
  setOathbreakerData: () => {},
};
const OathbreakerContext = React.createContext<OathbreakerContextValue>(DEFAULT_VALUE);

type OathbreakerProviderProps = {
  initialValue?: OathbreakerData;
};
const OathbreakerProvider: React.FC<OathbreakerProviderProps> = ({
  children,
  initialValue = DEFAULT_VALUE.oathbreakerData,
}) => {
  const [oathbreakerData, setOathbreakerData] = useState<OathbreakerData>(initialValue);
  const value = useMemo<OathbreakerContextValue>(
    () => ({ oathbreakerData, setOathbreakerData }),
    [oathbreakerData],
  );

  return (
    <OathbreakerContext.Provider value={value}>{children}</OathbreakerContext.Provider>
  );
};

export { OathbreakerContext, OathbreakerProvider, OathbreakerData };
