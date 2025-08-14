import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "@theme";
import Layout from "@components/Layout";
import { CardProvider } from "@contexts/Card";
import { AttributesProvider } from "@contexts/Attributes";
import { SettingsProvider } from "@contexts/Settings";
import { FormatProvider } from "@contexts/Format";
import useAutoLoad from "@hooks/useAutoLoad";
import "./index.css";

const App: React.FC = () => {
  const { attributes, format, cards } = useAutoLoad();
  return (
    <FormatProvider initialValue={format}>
      <CardProvider initialValue={cards}>
        <AttributesProvider initialValue={attributes}>
          <SettingsProvider>
            <ThemeProvider theme={theme}>
              <Layout />
            </ThemeProvider>
          </SettingsProvider>
        </AttributesProvider>
      </CardProvider>
    </FormatProvider>
  );
};

export default App;
