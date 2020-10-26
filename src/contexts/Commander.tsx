import React, { useState, useMemo } from 'react';

type CommanderData = {
  commander?:Card;
  partner?: Card;
  partnerQuery?: Card["partnerQuery"];
  colorIdentity: string[];
}

type CommanderContextValue = {
  commanderData:CommanderData;
  setCommanderData: React.Dispatch<React.SetStateAction<CommanderData>>;
}

const DEFAULT_VALUE:CommanderContextValue = {
  commanderData: {
    colorIdentity: ['c'],
  },
  setCommanderData: () => {},
};
const CommanderContext = React.createContext<CommanderContextValue>(DEFAULT_VALUE);

type CommanderProviderProps = {
  initialValue?: CommanderData;
}
const CommanderProvider:React.FC<CommanderProviderProps> = ({
  children, initialValue = DEFAULT_VALUE.commanderData,
}) => {
  const [commanderData, setCommanderData] = useState<CommanderData>(initialValue);

  const value = useMemo<CommanderContextValue>(() => ({ commanderData, setCommanderData }), [commanderData]);

  return (
    <CommanderContext.Provider value={value}>
      {children}
    </CommanderContext.Provider>
  );
};

export { CommanderContext, CommanderProvider, CommanderData };
