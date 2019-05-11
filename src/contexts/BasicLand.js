import React, { useState, useMemo } from 'react';

const BasicLandContext = React.createContext();

const BasicLandProvider = ({ children, initialValue = {} }) => {
	const [basicLand, setBasicLand] = useState(initialValue);

	const value = useMemo(() => ({ basicLand, setBasicLand }), [basicLand]);

	return (
		<BasicLandContext.Provider value={value}>
			{children}
		</BasicLandContext.Provider>
	);
};

export { BasicLandContext, BasicLandProvider };
