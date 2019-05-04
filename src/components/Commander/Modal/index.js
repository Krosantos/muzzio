import React from 'react';
import ModalContainer from './ModalContainer';
import CommanderSearch from './CommanderSearch';
import PartnerSearch from './PartnerSearch';

const Modal = ({
	closeModal,
}) => (
	<ModalContainer closeModal={closeModal}>
		<CommanderSearch closeModal={closeModal} />
		<PartnerSearch closeModal={closeModal} />
	</ModalContainer>
);

export default Modal;
