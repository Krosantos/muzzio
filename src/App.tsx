import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@theme';
import Layout from '@components/Layout';
import { CardProvider } from '@contexts/Card';
import { CommanderProvider } from '@contexts/Commander';
import { OathbreakerProvider } from '@contexts/Oathbreaker';
import { AttributesProvider } from '@contexts/Attributes';
import { SettingsProvider } from '@contexts/Settings';
import { FormatProvider } from '@contexts/Format';
import useAutoLoad from '@hooks/useAutoLoad';
import './index.css';

/* eslint-disable react/jsx-max-depth */
const App:React.FC = () => {
  const {
    attributes,
    format,
    cards,
    commanderData,
    oathbreakerData,
  } = useAutoLoad();

  return (
    <FormatProvider initialValue={format}>
      <CardProvider initialValue={cards}>
        <CommanderProvider initialValue={commanderData}>
          <OathbreakerProvider initialValue={oathbreakerData}>
            <AttributesProvider initialValue={attributes}>
              <SettingsProvider>
                <ThemeProvider theme={theme}>
                  <Layout />
                </ThemeProvider>
              </SettingsProvider>
            </AttributesProvider>
          </OathbreakerProvider>
        </CommanderProvider>
      </CardProvider>
    </FormatProvider>
  );
};

export default App;
