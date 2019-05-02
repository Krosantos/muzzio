/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useContext, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { CommanderContext } from '@contexts/Commander';
import ManaCost from '@components/ManaCost';
import useCards from '@hooks/useCards';
import getAverageCmc from '@utils/getAverageCmc';
import { IS_IN_DECK } from '@constants';
import Modal from './Modal';
import { container } from './styles.scss';

const SELECT_COMMANDER_TEXT = 'Select Commander';
const CMC = 'CMC: ';
const OUT_OF_99 = '/99';

const convertIdentityToCost = (identity) => {
	if (!identity)
		return null;
	// Colorless!
	if (identity.length === 0)
		return '{C}';
	return `{${identity.join('}{')}}`;
};

// eslint-disable-next-line max-statements
const Commander = () => {
	const { commander, setCommander } = useContext(CommanderContext);
	const [isModalOpen, setModalOpen] = useState(false);
	const closeModal = useCallback(() => setModalOpen(false));
	const openModal = useCallback(() => setModalOpen(true));

	const cards = useCards(IS_IN_DECK);
	const count = Object.keys(cards).length;
	const cmc = getAverageCmc(cards).toPrecision(3);
	const { name, identity } = commander;
	const identityAsCost = convertIdentityToCost(identity);

	return (
		<div className={container}>
			<span onClick={openModal}>
				{name || SELECT_COMMANDER_TEXT}
			</span>
			<span>
				{count}
				{OUT_OF_99}
			</span>
			<span>
				{CMC}
				{cmc}
			</span>
			<ManaCost cost={identityAsCost} />
			{isModalOpen
			&& ReactDOM.createPortal(
				<Modal
					closeModal={closeModal}
					commander={commander}
					setCommander={setCommander}
				/>,
				document.querySelector('body'),
			)}
		</div>
	);
};

export default Commander;
