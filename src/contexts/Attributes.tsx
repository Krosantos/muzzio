import React, { useState, useMemo, ReactNode } from "react";
import { ALL_CARDS } from "@constants";

type AttributesProviderValue = {
  attributes: string[];
  setAttributes: React.Dispatch<React.SetStateAction<string[]>>;
};

const DEFAULT_VALUE: AttributesProviderValue = {
  attributes: [ALL_CARDS],
  setAttributes: () => {},
};

const AttributesContext = React.createContext<AttributesProviderValue>(DEFAULT_VALUE);

type AttributesProviderProps = {
  initialValue?: string[];
  children: ReactNode;
};
const AttributesProvider: React.FC<AttributesProviderProps> = ({
  children,
  initialValue,
}) => {
  const [attributes, setAttributes] = useState<string[]>(initialValue || [ALL_CARDS]);

  const value = useMemo<AttributesProviderValue>(
    () => ({ attributes, setAttributes }),
    [attributes],
  );

  return (
    <AttributesContext.Provider value={value}>{children}</AttributesContext.Provider>
  );
};

export { AttributesContext, AttributesProvider };
