import React, { useState, useMemo } from 'react';
import { ALL_CARDS } from '@constants';

const AttributesContext = React.createContext();

const AttributesProvider = ({ children }) => {
	const [attributes, setAttributes] = useState([ALL_CARDS]);

	const value = useMemo(() => ({ attributes, setAttributes }), [attributes]);

	return (
		<AttributesContext.Provider value={value}>
			{children}
		</AttributesContext.Provider>
	);
};

export { AttributesContext, AttributesProvider };
