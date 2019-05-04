import React, { useState, useMemo } from 'react';

const CommanderContext = React.createContext();

const CommanderProvider = ({ children }) => {
	const [commanderData, setCommanderData] = useState();

	const value = useMemo(() => ({ commanderData, setCommanderData }));

	return (
		<CommanderContext.Provider value={value}>
			{children}
		</CommanderContext.Provider>
	);
};

export { CommanderContext, CommanderProvider };
