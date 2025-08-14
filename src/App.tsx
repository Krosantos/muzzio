import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "@theme";
import Layout from "@components/Layout";
import { CardProvider } from "@contexts/Card";
import { SettingsProvider } from "@contexts/Settings";
import useAutoLoad from "@hooks/useAutoLoad";
import "./index.css";

const App: React.FC = () => {
  const { cards } = useAutoLoad();
  return (
    <CardProvider initialValue={cards}>
      <SettingsProvider>
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </SettingsProvider>
    </CardProvider>
  );
};

export default App;
