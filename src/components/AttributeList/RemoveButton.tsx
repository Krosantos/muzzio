import React, { useCallback } from "react";
import styled from "styled-components";
import useAttributes from "@hooks/useAttributes";

const X = "X";

type RemoveButtonProps = {
  attribute: string;
};

const RemoveButton: React.FC<RemoveButtonProps> = ({ attribute }) => {
  const { removeAttribute } = useAttributes();
  const handleClick = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      removeAttribute(attribute);
    },
    [attribute, removeAttribute],
  );

  return (
    <Button onClick={handleClick} type="button">
      {X}
    </Button>
  );
};

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default RemoveButton;
