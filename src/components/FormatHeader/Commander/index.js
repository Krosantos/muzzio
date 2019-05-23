/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import useCommander from '@hooks/useCommander';
import ManaCost from '@components/ManaCost';
import BasicLandModal from '../BasicLandModal';
import CardCount from '../CardCount';
import CommanderModal from './CommanderModal';
import {
	container,
	commanderName,
	manaCost,
} from './styles.scss';

const SELECT_COMMANDER_TEXT = 'Select Commander';

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
		commander = {},
		partner = {},
	} = useCommander();

	const identityAsCost = useMemo(() => convertIdentityToCost(colorIdentity), [colorIdentity]);

	return (
		<div className={container}>
			<div className={commanderName} onClick={openCommanderModal}>
				<span>
					{commander.name || SELECT_COMMANDER_TEXT}
				</span>
				<span>
					{partner.name}
				</span>
			</div>
			<CardCount />
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
