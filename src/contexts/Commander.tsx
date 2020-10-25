import React, { useState, useMemo } from 'react';
import { ANY_PARTNER, SPECIFIC_PARTNER } from '@constants';

type CommanderData = {
  commander:Card;
  partner?: Card;
  partnerQuery?: {
    type: typeof ANY_PARTNER | typeof SPECIFIC_PARTNER;
    query: string;
  };
  colorIdentity: string[];
}

type CommanderContextValue = {
  commanderData:CommanderData;
  setCommanderData: React.Dispatch<React.SetStateAction<CommanderData>>;
}

const DEFAULT_VALUE:CommanderContextValue = {
  commanderData: {
    colorIdentity: ['c'],
    commander: {},
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

export { CommanderContext, CommanderProvider };
