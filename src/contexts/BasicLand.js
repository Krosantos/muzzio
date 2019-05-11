import React, { useState, useMemo } from 'react';

const BasicLandContext = React.createContext();

const BasicLandProvider = ({ children, initialValue = {} }) => {
	const [BasicLand, setBasicLand] = useState(initialValue);

	const value = useMemo(() => ({ BasicLand, setBasicLand }), [BasicLand]);

	return (
		<BasicLandContext.Provider value={value}>
			{children}
		</BasicLandContext.Provider>
	);
};

export { BasicLandContext, BasicLandProvider };
