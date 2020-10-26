import React, { useState } from 'react';
import styled from 'styled-components';
import Search from '@components/Search';
import CardList from '@components/CardList';
import useCards from '@hooks/useCards';

const AddCards:React.FC = () => {
  const [results, setResults] = useState([]);
  const { addCard } = useCards();

  return (
    <SearchSelection>
      <Search
        placeholder="Search for cards"
        setResults={setResults}
      />
      <ListWrapper>
        <CardList alwaysColorful callback={addCard} cards={results} />
      </ListWrapper>
    </SearchSelection>
  );
};

const SearchSelection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0px 8px 8px;
  height: 100%;

  input {
      margin-right: 8px;
  }
`;

const ListWrapper = styled.div`
  margin-top: 4px;
  overflow-y: auto;
  margin-right: 4px;
  padding-right: 4px;
  height: calc(100% - 36px);
`;

export default AddCards;
