/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import search from "@api/search";
import useFormat from "@hooks/useFormat";
import { OATHBREAKER, oathbreakerBanlist } from "@constants";
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
  const { format } = useFormat();
  const updateValue = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const constraint = useQueryConstraints(bypassIdentity);
  const onEnter = useCallback(
    async ({ key }) => {
      if (key !== "Enter") return;
      let searchResults = await search(`${value} ${constraint} ${additionalConstraint}`);

      if (format === OATHBREAKER) {
        searchResults = searchResults.filter(
          (card) => !oathbreakerBanlist.includes(card.name),
        );
      }
      setResults(searchResults);
    },
    [additionalConstraint, constraint, format, setResults, value],
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
