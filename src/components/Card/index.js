/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import ManaCost from '@components/ManaCost';
import useCards from '@hooks/useCards';
import { IS_IN_DECK } from '@constants';
import useHoverArt from './useHoverArt';
import CardCountModal from './CardCountModal';
import useRightClickMenu from './useRightClickMenu';
import useCard from './useCard';
import HoverArt from './HoverArt';
import getColorClass from './getColorClass';
import { cardRow } from './styles.scss';

// eslint-disable-next-line max-statements, max-lines-per-function
const Card = ({
	callback = Function.prototype,
	rawCard,
	cardId,
	alwaysColorful,
}) => {
	const card = useCard(cardId, rawCard);
	const {
		attributes,
		cost,
		count,
		name,
		imageUrl,
		reverseUrl,
	} = card;

	const nameAndCount = useMemo(() => {
		if (!count || count <= 1 || !attributes[IS_IN_DECK])
			return name;
		return `${count} ${name}`;
	}, [count, name, attributes[IS_IN_DECK]]);
	const { setCount, setSideboardCount } = useCards();

	const [isCardCountModalOpen, setCardCountModalOpen] = useState(false);
	const closeCardCountModal = useCallback(() => setCardCountModalOpen(false), []);
	const openCardCountModal = useCallback(() => setCardCountModalOpen(true), []);

	const [isSideboardCountModalOpen, setSideboardCountModalOpen] = useState(false);
	const closeSideboardCountModal = useCallback(() => setSideboardCountModalOpen(false), []);
	const openSideboardCountModal = useCallback(() => setSideboardCountModalOpen(true), []);

	const fireCallback = useCallback(() => callback(card), [card, callback]);
	const className = useMemo(() => `${cardRow} ${getColorClass(card, alwaysColorful)}`, [attributes[IS_IN_DECK]]);
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
			{shouldShowArt && <HoverArt imageUrl={imageUrl} reverseUrl={reverseUrl} />}
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
