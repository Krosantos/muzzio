import React from "react";
import styled from "styled-components";

type SliderButtonProps = {
  label: string;
  handleClick: React.FormEventHandler<HTMLButtonElement>;
};
const SliderButton: React.FC<SliderButtonProps> = ({ label, handleClick }) => (
  <Button onClick={handleClick} type="button">
    {label}
  </Button>
);

const Button = styled.button`
  cursor: pointer;
  padding: 0 10px;
  font-family: "Beleren", "sans-serif";
  text-align: center;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.smoke};
  width: fit-content;
`;

export default SliderButton;
