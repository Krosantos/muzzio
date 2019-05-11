/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import useCommander from '@hooks/useCommander';
import ManaCost from '@components/ManaCost';
import useCards from '@hooks/useCards';
import useBasicLands from '@hooks/useBasicLands';
import getAverageCmc from '@utils/getAverageCmc';
import { IS_IN_DECK } from '@constants';
import BasicLandModal from './BasicLandModal';
import CommanderModal from './CommanderModal';
import {
	cardCount,
	container,
	commanderName,
	manaCost,
} from './styles.scss';

const SELECT_COMMANDER_TEXT = 'Select Commander';
const CMC = 'CMC: ';
const OUT_OF_99 = '/99';

const convertIdentityToCost = (identity) => {
	if (identity.length === 0)
		return '{C}';
	return `{${identity.join('}{')}}`;
};

// eslint-disable-next-line max-statements, max-lines-per-function
const Commander = () => {
	const [isCommanderModalOpen, setCommanderModalOpen] = useState(false);
	const closeCommanderModal = useCallback(() => setCommanderModalOpen(false), []);
	const openCommanderModal = useCallback(() => setCommanderModalOpen(true), []);
	const [isLandModalOpen, setLandModalOpen] = useState(false);
	const closeLandModal = useCallback(() => setLandModalOpen(false), []);
	const openLandModal = useCallback(() => setLandModalOpen(true), []);
	const {
		colorIdentity,
		commander,
		partner,
	} = useCommander();
	const identityAsCost = useMemo(() => convertIdentityToCost(colorIdentity), [colorIdentity]);
	const { cardsByAttribute } = useCards();
	const { totalCount: basicCount } = useBasicLands('');
	const cardsInDeck = cardsByAttribute(IS_IN_DECK);
	const count = cardsInDeck.length + basicCount;
	const cmc = getAverageCmc(cardsInDeck).toPrecision(3);

	return (
		<div className={container}>
			<div className={commanderName} onClick={openCommanderModal}>
				<span>
					{commander || SELECT_COMMANDER_TEXT}
				</span>
				<span>
					{partner}
				</span>
			</div>
			<div className={cardCount}>
				<span>
					{count}
					{OUT_OF_99}
				</span>
				<span>
					{CMC}
					{cmc}
				</span>
			</div>
			<div className={manaCost} onClick={openLandModal}>
				<ManaCost className={manaCost} cost={identityAsCost} />
			</div>
			{isCommanderModalOpen
			&& ReactDOM.createPortal(
				<CommanderModal
					closeModal={closeCommanderModal}
				/>,
				document.querySelector('body'),
			)}
			{isLandModalOpen
			&& ReactDOM.createPortal(
				<BasicLandModal
					closeModal={closeLandModal}
					identities={colorIdentity}
				/>,
				document.querySelector('body'),
			)}
		</div>
	);
};

export default Commander;
