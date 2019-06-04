/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback } from 'react';
import useCards from '@hooks/useCards';
import ModalContainer from '@components/ModalContainer';
import { cardCountModal } from './styles.scss';

const CardCountModal = ({ card, closeModal }) => {
	const { setCount } = useCards();
	const [internalCount, setInternalCount] = useState('');
	const updateInternalCount = useCallback((event) => {
		event.preventDefault();
		const count = event.target.value;

		setInternalCount(count);
	}, []);
	const wrappedKeyDown = useCallback((event) => {
		event.preventDefault();
		const count = parseInt(internalCount, 10);

		setCount(card, count);
		closeModal();
	}, [internalCount]);

	return (
		<ModalContainer closeModal={closeModal}>
			<form className={cardCountModal} onSubmit={wrappedKeyDown}>
				<input
					autoFocus
					onChange={updateInternalCount}
					type="number"
					value={internalCount}
				/>
				<span>{card.name}</span>
			</form>
		</ModalContainer>
	);
};

export default CardCountModal;
