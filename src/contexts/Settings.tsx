import React, { Reducer, useReducer, useMemo, useCallback } from "react";
import set from "lodash/set";
import electronSettings from "electron-settings";

type SettingsValue = string | number | boolean;
type Settings = { [key: string]: SettingsValue };
type Action = {
  key: string;
  value: SettingsValue;
};
const settingReducer: Reducer<Settings, Action> = (prevState, action) => {
  const { key, value } = action;
  const state = { ...prevState };

  electronSettings.set(key, value);
  set(state, key, value);
  return state;
};

type SettingsContextValue = {
  settings: Settings;
  setSettings: (key: string, value: SettingsValue) => void;
};
const DEFAULT_VALUE: SettingsContextValue = {
  setSettings: () => {},
  settings: {},
};
const SettingsContext = React.createContext<SettingsContextValue>(DEFAULT_VALUE);

const SettingsProvider: React.FC = ({ children }) => {
  const [settings, dispatch] = useReducer<Reducer<Settings, Action>>(
    settingReducer,
    electronSettings.getSync() as Settings,
  );
  const setSettings = useCallback(
    (key, value) => {
      dispatch({ key, value });
    },
    [dispatch],
  );
  const value = useMemo<SettingsContextValue>(() => ({ setSettings, settings }), [
    setSettings,
    settings,
  ]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export { SettingsContext, SettingsProvider };
