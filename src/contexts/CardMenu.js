import React, { useState, useMemo } from 'react';

const CardMenuContext = React.createContext();

const CardMenuProvider = ({ children }) => {
  const [cardMenu, setCardMenu] = useState({});

  const value = useMemo(() => ({ cardMenu, setCardMenu }), [cardMenu]);

  return (
    <CardMenuContext.Provider value={value}>
      {children}
    </CardMenuContext.Provider>
  );
};

export { CardMenuContext, CardMenuProvider };
