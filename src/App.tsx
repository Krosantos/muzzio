import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "@theme";
import Layout from "@components/Layout";
import { CardProvider } from "@contexts/Card";
import { CommanderProvider } from "@contexts/Commander";
import { AttributesProvider } from "@contexts/Attributes";
import { SettingsProvider } from "@contexts/Settings";
import { FormatProvider } from "@contexts/Format";
import useAutoLoad from "@hooks/useAutoLoad";
import "./index.css";

const App: React.FC = () => {
  const { attributes, format, cards, commanderData } = useAutoLoad();

  return (
    <FormatProvider initialValue={format}>
      <CardProvider initialValue={cards}>
        <CommanderProvider initialValue={commanderData}>
          <AttributesProvider initialValue={attributes}>
            <SettingsProvider>
              <ThemeProvider theme={theme}>
                <Layout />
              </ThemeProvider>
            </SettingsProvider>
          </AttributesProvider>
        </CommanderProvider>
      </CardProvider>
    </FormatProvider>
  );
};

export default App;
