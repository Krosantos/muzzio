import React, { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import SliderButton from "./SliderButton";

type SliderProps = {
  label: string;
  left?: boolean;
  children: ReactNode;
};
const Slider: React.FC<SliderProps> = ({ children, label, left }) => {
  const [isOpen, setOpen] = useState(false);
  const toggleSlider = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      setOpen(!isOpen);
    },
    [isOpen],
  );

  return (
    <Container isOpen={isOpen} left={left}>
      <ZIndexer>{children}</ZIndexer>
      <ButtonWrapper left={left}>
        <SliderButton handleClick={toggleSlider} label={label} />
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div<{ left: boolean; isOpen: boolean }>`
  height: calc(100vh - 3em);
  position: fixed;
  top: 3em;
  border-top: 1px solid ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.smoke};
  width: 300px;
  transition: transform 250ms ease-in-out;

  & ::-webkit-scrollbar {
    height: 16px;
    width: 10px;
  }

  & ::-webkit-scrollbar-button {
    display: none;
  }

  & ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.white};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.white};
  }

  ${({ left, isOpen }) => {
    // If I'm on the right, move me over.
    let result = left ? "" : "right: 0;";

    if (!isOpen) {
      // If I'm retracted, translate me based on left/right side.
      result += `transform: translateX(${left ? "-100" : "100"}%);`;
    }
    return result;
  }}
`;

const ZIndexer = styled.div`
  position: relative;
  height: 100%;
  z-index: 5;
`;

const ButtonWrapper = styled.div<{ left: boolean }>`
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  height: 1.5em;
  z-index: 0;
  ${({ left }) => {
    if (left) {
      return `
      right: 0;
      transform: translateX(calc(50% + 0.75em)) rotate(90deg);
      > * {
          border-radius: 10px 10px 0 0;
      }
      `;
    }

    return `
    left: 0;
    transform: translateX(calc(-50% - 0.75em)) rotate(90deg);
    > * {
        border-radius: 0 0 10px 10px;
    }`;
  }}
`;

export default Slider;
