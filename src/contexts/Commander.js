import React, { useState, useMemo } from 'react';

const CommanderContext = React.createContext();

const CommanderProvider = ({ children, initialValue = {} }) => {
  const [commanderData, setCommanderData] = useState(initialValue);

  const value = useMemo(() => ({ commanderData, setCommanderData }), [commanderData]);

  return (
    <CommanderContext.Provider value={value}>
      {children}
    </CommanderContext.Provider>
  );
};

export { CommanderContext, CommanderProvider };
