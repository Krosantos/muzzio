/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import ManaCost from '@components/ManaCost';
import useCards from '@hooks/useCards';
import useHoverArt from './useHoverArt';
import CardCountModal from './CardCountModal';
import useRightClickMenu from './useRightClickMenu';
import useCard from './useCard';
import HoverArt from './HoverArt';
import getColorClass from './getColorClass';
import { cardRow } from './styles.scss';
import useNameAndCount from './useNameAndCount';

// eslint-disable-next-line max-statements, max-lines-per-function
const Card = ({
	callback = Function.prototype,
	rawCard,
	cardId,
	alwaysColorful,
	useMaindeckCount,
	useSideboardCount,
}) => {
	const card = useCard(cardId, rawCard);
	const {
		id,
		cost,
		imageUrl,
		reverseUrl,
	} = card;

	const nameAndCount = useNameAndCount(card, useMaindeckCount, useSideboardCount);
	const { setCount, setSideboardCount } = useCards();

	const [isCardCountModalOpen, setCardCountModalOpen] = useState(false);
	const closeCardCountModal = useCallback(() => setCardCountModalOpen(false), []);
	const openCardCountModal = useCallback(() => setCardCountModalOpen(true), []);

	const [isSideboardCountModalOpen, setSideboardCountModalOpen] = useState(false);
	const closeSideboardCountModal = useCallback(() => setSideboardCountModalOpen(false), []);
	const openSideboardCountModal = useCallback(() => setSideboardCountModalOpen(true), []);

	const fireCallback = useCallback(() => callback(card), [card, callback]);
	const className = useMemo(() => `${cardRow} ${getColorClass(card.count, card.sideboardCount, card.colors, alwaysColorful)}`, [alwaysColorful, card.colors, card.count, card.sideboardCount]);
	const handleContextClick = useRightClickMenu(card, openCardCountModal, openSideboardCountModal);
	const { shouldShowArt, showArt, hideArt } = useHoverArt();

	return (
		<>
			<div
				className={className}
				onClick={fireCallback}
				onContextMenu={handleContextClick}
				onMouseEnter={showArt}
				onMouseLeave={hideArt}
			>
				{nameAndCount}
				<ManaCost cost={cost} />
			</div>
			{shouldShowArt && <HoverArt id={id} imageUrl={imageUrl} reverseUrl={reverseUrl} />}
			{isCardCountModalOpen
				&& ReactDOM.createPortal(
					<CardCountModal
						card={card}
						closeModal={closeCardCountModal}
						setCountCallback={setCount}
					/>,
					document.querySelector('body'),
				)}
			{isSideboardCountModalOpen
				&& ReactDOM.createPortal(
					<CardCountModal
						card={card}
						closeModal={closeSideboardCountModal}
						setCountCallback={setSideboardCount}
					/>,
					document.querySelector('body'),
				)}
		</>
	);
};

export default React.memo(Card);
