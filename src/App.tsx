import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "@theme";
import Layout from "@components/Layout";
import { SettingsProvider } from "@contexts/Settings";
import useAutoLoad from "@hooks/useAutoLoad";
import "./index.css";

const App: React.FC = () => {
  useAutoLoad();
  return (
    <SettingsProvider>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </SettingsProvider>
  );
};

export default App;
