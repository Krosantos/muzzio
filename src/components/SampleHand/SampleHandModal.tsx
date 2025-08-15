import React from "react";
import styled, { css } from "styled-components";
import ModalContainer from "@components/ModalContainer";
import useSampleHand, { DisplayCard } from "./useSampleHand";

const NEW_HAND_TEXT = "New Hand";
const ADD_CARD_TEXT = "Add Card";

type CardSectionProps = {
  cardsInHand: DisplayCard[];
};
const CardSection: React.FC<CardSectionProps> = ({ cardsInHand }) => (
  <CardContainer>
    {cardsInHand.map(({ imageUrl, backImageUrl, name }, index) => {
      const key = `${index}_${name}`;

      if (!backImageUrl) {
        return (
          <FlipCard key={key}>
            <Img alt={name} src={imageUrl} />
          </FlipCard>
        );
      }

      return (
        <FlipCard key={key} $hasReverse>
          <Inner>
            <Face $isBack={false}>
              <Img alt={name} src={imageUrl} />
            </Face>
            <Face $isBack={true}>
              <Img alt={name} src={backImageUrl} />
            </Face>
          </Inner>
        </FlipCard>
      );
    })}
  </CardContainer>
);

const FlipCard = styled.div<{ $hasReverse?: boolean }>`
  perspective: 20000px;
  height: 255px;
  width: 183px;
  margin: 4px;
`;

const Face = styled.div<{ $isBack: boolean }>`
  backface-visibility: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 50%;
  ${({ $isBack }) =>
    $isBack
      ? css`
          transform: translateX(-50%) rotateY(180deg);
        `
      : css`
          transform: translateX(-50%);
        `}
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center;
  transition: transform 0.5s ease-in-out;
  transform: rotateY(0deg);
  &:hover {
    transform: rotateY(-180deg);
  }
`;

const CardContainer = styled.div`
  display: flex;
  overflow-y: scroll;
  width: fit-content;
  max-height: 658px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Img = styled.img`
  display: block;
  height: 255px;
  width: 183px;
  margin: 4px;
`;

type ButtonSectionProps = {
  generateNewHand: () => void;
  addCard: () => void;
};
const ButtonSection: React.FC<ButtonSectionProps> = ({ generateNewHand, addCard }) => (
  <ButtonContainer>
    <ModifyButton onClick={addCard} type="button">
      {ADD_CARD_TEXT}
    </ModifyButton>
    <ModifyButton onClick={generateNewHand} type="button">
      {NEW_HAND_TEXT}
    </ModifyButton>
  </ButtonContainer>
);

const ButtonContainer = styled.div`
  display: flex;
  margin: 4px;
  justify-content: space-evenly;
`;
const ModifyButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.smoke};
  border: 1px solid ${({ theme }) => theme.white};
  font-family: "Bitter", sans-serif;
  height: 2em;
  padding: 4px;
  margin: 4px;
  vertical-align: middle;
  width: 50%;
  &:hover {
    color: ${({ theme }) => theme.smoke};
    background-color: ${({ theme }) => theme.white};
  }
  transition: all 100ms ease-in;
`;

type SampleHandModalProps = {
  closeModal: () => void;
};
const SampleHandModal: React.FC<SampleHandModalProps> = ({ closeModal }) => {
  const { generateNewHand, cardsInHand, addCard } = useSampleHand();

  return (
    <ModalContainer closeModal={closeModal}>
      <ModalBody>
        <CardSection cardsInHand={cardsInHand} />
        <ButtonSection addCard={addCard} generateNewHand={generateNewHand} />
      </ModalBody>
    </ModalContainer>
  );
};

const ModalBody = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.smoke};
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-width: 50vw;
  padding: 8px;
`;

export default SampleHandModal;
