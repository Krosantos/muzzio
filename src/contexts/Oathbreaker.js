import React, { useState, useMemo } from 'react';

const OathbreakerContext = React.createContext();

const OathbreakerProvider = ({ children, initialValue = {} }) => {
  const [oathbreakerData, setOathbreakerData] = useState(initialValue);

  const value = useMemo(() => ({ oathbreakerData, setOathbreakerData }), [oathbreakerData]);

  return (
    <OathbreakerContext.Provider value={value}>
      {children}
    </OathbreakerContext.Provider>
  );
};

export { OathbreakerContext, OathbreakerProvider };
