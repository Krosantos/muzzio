import React, { useState, useMemo } from 'react';

const CommanderContext = React.createContext();

const CommanderProvider = ({ children }) => {
	const [commander, setCommander] = useState({});
	const value = useMemo(() => [commander, setCommander], [commander]);

	return (
		<CommanderContext.Provider value={value}>
			{children}
		</CommanderContext.Provider>
	);
};

export { CommanderContext, CommanderProvider };
