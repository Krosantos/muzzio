import getCardByName from "@api/getCardByName";
import ModalContainer from "@components/ModalContainer";
import React from "react";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

type CardVariantModalProps = {
  card: Card;
  closeModal: () => void;
};

const CardVariantModal: React.FC<CardVariantModalProps> = ({ card, closeModal }) => {
  const [otherVersions, setOtherVersions] = useState<Card[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVersions = async () => {
      setLoading(true);
      const versions = await getCardByName(card.name);
      setOtherVersions(versions);
      setLoading(false);
    };
    fetchVersions();
  }, [card.name]);

  return (
    <ModalContainer closeModal={closeModal}>
      {isLoading && <h1>Loading...</h1>}

      <CardContainer>
        {otherVersions.map(({ imageUrl, name }, index) => {
          const key = `${index}_${name}`;

          //   if (!backImageUrl) {
          return (
            <FlipCard key={key}>
              <Img alt={name} src={imageUrl} />
            </FlipCard>
          );
          //   }

          //   return (
          //     <FlipCard key={key} $hasReverse>
          //       <Inner>
          //         <Face $isBack={false}>
          //           <Img alt={name} src={imageUrl} />
          //         </Face>
          //         <Face $isBack={true}>
          //           <Img alt={name} src={backImageUrl} />
          //         </Face>
          //       </Inner>
          //     </FlipCard>
          //   );
        })}
      </CardContainer>
    </ModalContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  overflow-y: scroll;
  max-width: calc(100vw - 64px);
  max-height: calc(100vh - 64px);
  padding-left: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const FlipCard = styled.div<{ $hasReverse?: boolean }>`
  perspective: 20000px;
  height: calc(2 * 255px);
  width: calc(2 * 183px);
  overflow: hidden;
  border-radius: 12px;
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

const Img = styled.img`
  display: block;
  height: calc(2 * 255px);
  width: calc(2 * 183px);
`;

export default CardVariantModal;
