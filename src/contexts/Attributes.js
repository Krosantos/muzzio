import React, { useState, useMemo } from 'react';
import { ALL_CARDS } from '@constants';

const AttributesContext = React.createContext();

const AttributesProvider = ({ children }) => {
	const [attributes, setAttributes] = useState([
		ALL_CARDS,
		'q',
		'w',
		'e',
		'r',
		't',
		'y',
		'u',
		'u',
		'i',
		'o',
		'p',
		'a',
		's',
		'd',
		'f',
		'g',
		'h',
		'j',
		'k',
		'l',
		'z',
		'x',
		'c',
		'v',
		'b',
		'n',
		'm',
	]);

	const value = useMemo(() => ({ attributes, setAttributes }), [attributes]);

	return (
		<AttributesContext.Provider value={value}>
			{children}
		</AttributesContext.Provider>
	);
};

export { AttributesContext, AttributesProvider };
