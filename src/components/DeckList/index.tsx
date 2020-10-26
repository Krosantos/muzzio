import React from 'react';
import styled from 'styled-components';
import CardList from '@components/CardList';
import Divider from './Divider';
import useImport from './useImport';
import useDecklist from './useDecklist';
import useExport from './useExport';

const IMPORT = 'Import Clipboard';
const EXPORT = 'Export to Clipboard';
const MAINBOARD = 'Main Deck';
const SIDEBOARD = 'Sideboard';

const DeckList:React.FC = () => {
  const importFile = useImport();
  const { maindeck, sideboard } = useDecklist();
  const exportFile = useExport(maindeck, sideboard);

  return (
    <>
      <Decklist>
        <Divider label={MAINBOARD} />
        <CardList alwaysColorful cards={maindeck} useMaindeckCount />
        <Divider label={SIDEBOARD} />
        <CardList alwaysColorful cards={sideboard} useSideboardCount />
      </Decklist>
      <ButtonContainer>
        <ImportButton onClick={importFile} type="button">{IMPORT}</ImportButton>
        <ImportButton onClick={exportFile} type="button">{EXPORT}</ImportButton>
      </ButtonContainer>
    </>
  );
};

const Decklist = styled.div`
  padding: 0 4px;
  margin: 4px 4px;
  overflow-y: auto;
  height: calc(100% - 12px - 2em);
`;
const ButtonContainer = styled.div`
  display: flex;
  margin-top:4px;
  justify-content: space-evenly;
`;
const ImportButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.smoke};
  border: 1px solid ${({ theme }) => theme.white};
  font-family: "Bitter", sans-serif;
  height: 2em;
  padding: 4px;
  margin: 4px;
  vertical-align: middle;
  width: 50%;
  &:hover {
      color: ${({ theme }) => theme.smoke};
      background-color: ${({ theme }) => theme.white};
  }
  transition: all 100ms ease-in;
`;

export default DeckList;
