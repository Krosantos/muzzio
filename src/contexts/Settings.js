import React, { useReducer, useMemo, useCallback } from 'react';
import set from 'lodash/set';
import electronSettings from 'electron-settings';

const settingReducer = (prevState, action) => {
  const { key, value } = action;
  const state = { ...prevState };

  electronSettings.set(key, value);
  set(state, key, value);
  return state;
};

const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(settingReducer, electronSettings.getAll());
  const setSettings = useCallback((key, value) => {
    dispatch({ key, value });
  }, [dispatch]);
  const value = useMemo(() => ({ setSettings, settings }), [setSettings, settings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
