import { useAttributes } from "@contexts/Attributes";
import React, { useState, useCallback } from "react";
import styled from "styled-components";

const AddButton: React.FC = () => {
  const attributes = useAttributes((s) => s.attributes);
  const addAttribute = useAttributes((s) => s.addAttribute);
  const [toAdd, setToAdd] = useState("");
  const updateValue = useCallback((event) => {
    setToAdd(event.target.value);
  }, []);
  const onEnter = useCallback(
    async ({ key }) => {
      if (key !== "Enter" || attributes.includes(toAdd) || !toAdd) return;
      addAttribute(toAdd);
      setToAdd("");
    },
    [attributes, toAdd, addAttribute],
  );

  return (
    <Wrapper>
      <Input
        onChange={updateValue}
        onKeyPress={onEnter}
        placeholder="Add Attribute"
        value={toAdd}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.smoke};
  border-radius: 4px;
  width: 250px;
  background-color: ${({ theme }) => theme.taupe};
  padding: 4px 0px 4px 4px;
  max-height: calc(100% - 10px);
  margin-bottom: 4px;
  margin-right: 4px;

  & ::-webkit-scrollbar {
    width: 10px;
  }

  & ::-webkit-scrollbar-button {
    display: none;
  }

  & ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.smoke};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.smoke};
  }
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.white};
  border: none;
  padding: 0 4px;
  display: block;
  height: 1.5em;
  outline: none;
  font-family: "Bitter", sans-serif;
  width: 95%;
`;

export default AddButton;
