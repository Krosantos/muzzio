import React from "react";
import styled from "styled-components";
import Attribute from "./Attribute";
import AddButton from "./AddButton";
import { useAttributes } from "@contexts/Attributes";

const AttributeList: React.FC = () => {
  const { attributes } = useAttributes(({ attributes }) => ({ attributes }));

  return (
    <Wrapper>
      {attributes.map((attribute) => (
        <Attribute attribute={attribute} key={attribute} />
      ))}
      <AddButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: fit-content;
  max-width: 100%;
`;

export default AttributeList;
