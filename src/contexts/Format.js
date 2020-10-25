import React, { useState, useMemo } from 'react';
import { COMMANDER } from '@constants';

const FormatContext = React.createContext();

const FormatProvider = ({ children, initialValue }) => {
  const [format, setFormat] = useState(initialValue || COMMANDER);

  const value = useMemo(() => ({ format, setFormat }), [format]);

  return (
    <FormatContext.Provider value={value}>
      {children}
    </FormatContext.Provider>
  );
};

export { FormatContext, FormatProvider };
