import React from 'react';
import ModalContainer from '../../ModalContainer';
import OathbreakerSearch from './OathbreakerSearch';
import SignatureSearch from './SignatureSearch';
import { searchContainer } from '../styles.scss';

const Modal = ({
	closeModal,
}) => (
	<ModalContainer closeModal={closeModal}>
		<div className={searchContainer}>
			<OathbreakerSearch />
			<SignatureSearch closeModal={closeModal} />
		</div>
	</ModalContainer>
);

export default Modal;
