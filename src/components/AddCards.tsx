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
  padding: 0.5rem 0px 0.5rem 0.5rem;
  height: 100%;

  input {
      margin-right: 0.5rem;
  }
`;

const ListWrapper = styled.div`
  margin-top: 0.25rem;
  overflow-y: auto;
  margin-right: 0.25rem;
  padding-right: 0.25rem;
  height: calc(100% - 2.25rem);
`;

export default AddCards;
