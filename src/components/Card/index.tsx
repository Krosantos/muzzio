/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ManaCost from "@components/ManaCost";
import useCards from "@hooks/useCards";
import useHoverArt from "./useHoverArt";
import CardCountModal from "./CardCountModal";
import useRightClickMenu from "./useRightClickMenu";
import useCard from "./useCard";
import HoverArt from "./HoverArt";
import getCardColor from "./getCardColor";
import useNameAndCount from "./useNameAndCount";

type CardProps = {
  callback?: Function;
  rawCard: Card;
  cardId: string;
  alwaysColorful?: boolean;
  useMaindeckCount?: boolean;
  useSideboardCount?: boolean;
};

// eslint-disable-next-line max-statements, max-lines-per-function
const Card: React.FC<CardProps> = ({
  callback = Function.prototype,
  rawCard,
  cardId,
  alwaysColorful,
  useMaindeckCount,
  useSideboardCount,
}) => {
  const card = useCard(cardId, rawCard);
  const { id, cost, imageUrl, reverseUrl } = card;

  const nameAndCount = useNameAndCount(card, useMaindeckCount, useSideboardCount);
  const { setCount, setSideboardCount } = useCards();

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

const CardRow = styled.div<{ card: Card; alwaysColorful: boolean }>`
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
