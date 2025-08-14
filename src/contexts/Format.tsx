import React, { useState, useMemo, ReactNode } from "react";
import { COMMANDER, formats } from "@constants";

type Format = keyof typeof formats;
type FormatContextValue = {
  format: Format;
  setFormat: React.Dispatch<React.SetStateAction<Format>>;
};

const DEFAULT_VALUE: FormatContextValue = {
  format: COMMANDER,
  setFormat: () => {},
};
const FormatContext = React.createContext<FormatContextValue>(DEFAULT_VALUE);

type FormatProviderProps = {
  initialValue?: Format;
  children: ReactNode;
};
const FormatProvider: React.FC<FormatProviderProps> = ({ children, initialValue }) => {
  const [format, setFormat] = useState<Format>(initialValue || COMMANDER);

  const value = useMemo<FormatContextValue>(() => ({ format, setFormat }), [format]);

  return <FormatContext.Provider value={value}>{children}</FormatContext.Provider>;
};

export type { Format };
export { FormatContext, FormatProvider };
