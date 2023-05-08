import React, { useState, useCallback } from "react";
import styled from "styled-components";
import search from "@api/search";
import useQueryConstraints from "./useQueryConstraints";

type SearchProps = {
  additionalConstraint?: string;
  autoFocus?: boolean;
  bypassIdentity?: boolean;
  setResults: (results: Card[]) => void;
  placeholder: string;
};

const Search: React.FC<SearchProps> = ({
  additionalConstraint = "",
  autoFocus = false,
  bypassIdentity,
  setResults,
  placeholder,
}) => {
  const [value, setValue] = useState("");
  const updateValue = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const constraint = useQueryConstraints(bypassIdentity);
  const onEnter = useCallback(
    async ({ key }) => {
      if (key !== "Enter") return;
      let searchResults = await search(`${value} ${constraint} ${additionalConstraint}`);

      setResults(searchResults);
    },
    [additionalConstraint, constraint, setResults, value],
  );

  return (
    <Input
      autoFocus={autoFocus}
      onChange={updateValue}
      onKeyPress={onEnter}
      placeholder={placeholder}
      value={value}
    />
  );
};

const Input = styled.input`
  background-color: ${({ theme }) => theme.white};
  border: none;
  padding: 0 4px;
  display: block;
  height: 1.5em;
  outline: none;
  font-family: "Bitter", sans-serif;
`;

export default Search;
