import React, { useReducer, useMemo } from 'react';
import merge from 'lodash/merge';

const CommanderContext = React.createContext();

const reducer = (state, newState) => merge(state, newState);

const CommanderProvider = ({ children }) => {
	const [commanderData, dispatch] = useReducer(reducer, {});
	const value = useMemo(() => ({ commanderData, dispatch }));

	return (
		<CommanderContext.Provider value={value}>
			{children}
		</CommanderContext.Provider>
	);
};

export { CommanderContext, CommanderProvider };
