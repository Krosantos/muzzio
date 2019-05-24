import React from 'react';
import ModalContainer from '@components/ModalContainer';
import CommanderSearch from './CommanderSearch';
import PartnerSearch from './PartnerSearch';
import { searchContainer } from '../styles.scss';

const Modal = ({
	closeModal,
}) => (
	<ModalContainer closeModal={closeModal}>
		<div className={searchContainer}>
			<CommanderSearch closeModal={closeModal} />
			<PartnerSearch closeModal={closeModal} />
		</div>
	</ModalContainer>
);

export default Modal;
