import React, { useCallback, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ManaCost from "@components/ManaCost";
import { useFormat, type Format } from "@contexts/Format";
import useHoverArt from "./useHoverArt";
import CardCountModal from "./CardCountModal";
import useRightClickMenu from "./useRightClickMenu";
import useCard from "./useCard";
import HoverArt from "./HoverArt";
import getCardColor from "./getCardColor";
import useNameAndCount from "./useNameAndCount";
import { useCards } from "@contexts/Card";

type CardProps = {
  callback?: Function;
  rawCard: Card;
  cardName: string;
  alwaysColorful?: boolean;
  useMaindeckCount?: boolean;
  useSideboardCount?: boolean;
};

const Card: React.FC<CardProps> = ({
  callback = Function.prototype,
  rawCard,
  cardName,
  alwaysColorful,
  useMaindeckCount,
  useSideboardCount,
}) => {
  const card = useCard(cardName, rawCard);
  const format = useFormat((s) => s.format);
  const { id, cost, imageUrl, reverseUrl } = card;

  const nameAndCount = useNameAndCount(card, useMaindeckCount, useSideboardCount);
  const setCount = useCards((s) => s.setCount);
  const setSideboardCount = useCards((s) => s.setSideboardCount);

  const [isCardCountModalOpen, setCardCountModalOpen] = useState(false);
  const closeCardCountModal = useCallback(() => setCardCountModalOpen(false), []);
  const openCardCountModal = useCallback(() => setCardCountModalOpen(true), []);

  const [isSideboardCountModalOpen, setSideboardCountModalOpen] = useState(false);
  const closeSideboardCountModal = useCallback(
    () => setSideboardCountModalOpen(false),
    [],
  );
  const openSideboardCountModal = useCallback(() => setSideboardCountModalOpen(true), []);

  const fireCallback = useCallback(() => callback(card), [card, callback]);
  const handleContextClick = useRightClickMenu(
    card,
    openCardCountModal,
    openSideboardCountModal,
  );
  const { shouldShowArt, showArt, hideArt } = useHoverArt();

  return (
    <>
      <CardRow
        alwaysColorful={alwaysColorful}
        card={card}
        format={format}
        onClick={fireCallback}
        onContextMenu={handleContextClick}
        onMouseEnter={showArt}
        onMouseLeave={hideArt}
      >
        {nameAndCount}
        <ManaCost cost={cost} />
      </CardRow>
      {shouldShowArt && <HoverArt id={id} imageUrl={imageUrl} reverseUrl={reverseUrl} />}
      {isCardCountModalOpen &&
        ReactDOM.createPortal(
          <CardCountModal
            card={card}
            closeModal={closeCardCountModal}
            setCountCallback={setCount}
          />,
          document.querySelector("body"),
        )}
      {isSideboardCountModalOpen &&
        ReactDOM.createPortal(
          <CardCountModal
            card={card}
            closeModal={closeSideboardCountModal}
            setCountCallback={setSideboardCount}
          />,
          document.querySelector("body"),
        )}
    </>
  );
};

const CardRow = styled.div<{ card: Card; alwaysColorful: boolean; format: Format }>`
  display: flex;
  border-radius: 1em;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.smoke};
  align-items: center;
  padding: 2px 5px;
  justify-content: space-between;
  ${(props) => {
    const { color, bgColor } = getCardColor(props);

    return `
      color:${color};
      background-color:${bgColor};
     `;
  }}
`;

export default React.memo(Card);
