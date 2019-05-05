import React, { useState, useMemo } from 'react';

const AttributesContext = React.createContext();

const AttributesProvider = ({ children }) => {
	const [attributes, setAttributes] = useState([]);

	const value = useMemo(() => ({ attributes, setAttributes }));

	return (
		<AttributesContext.Provider value={value}>
			{children}
		</AttributesContext.Provider>
	);
};

export { AttributesContext, AttributesProvider };
