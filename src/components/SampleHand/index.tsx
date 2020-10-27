import React, { useCallback, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import SampleHandModal from "./SampleHandModal";

const SAMPLE_HAND_BUTTON_TEXT = "Sample Hand";

const SampleHand: React.FC = () => {
  const [isSampleHandModalOpen, setSampleHandModalOpen] = useState(false);
  const closeSampleHandModal = useCallback(() => setSampleHandModalOpen(false), []);
  const openSampleHandModal = useCallback(() => setSampleHandModalOpen(true), []);

  return (
    <div>
      <Button onClick={openSampleHandModal} type="button">
        {SAMPLE_HAND_BUTTON_TEXT}
      </Button>
      {isSampleHandModalOpen &&
        ReactDOM.createPortal(
          <SampleHandModal closeModal={closeSampleHandModal} />,
          document.querySelector("body"),
        )}
    </div>
  );
};

const Button = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.smoke};
  border: 1px solid ${({ theme }) => theme.white};
  font-family: "Bitter", sans-serif;
  height: 2em;
  padding: 4px;
  margin: 4px;
  vertical-align: middle;
  &:hover {
    color: ${({ theme }) => theme.smoke};
    background-color: ${({ theme }) => theme.white};
  }
  transition: all 100ms ease-in;
`;

export default SampleHand;
