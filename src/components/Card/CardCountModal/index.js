import React, { useState, useCallback } from 'react';
import useCards from '@hooks/useCards';
import ModalContainer from '@components/ModalContainer';
import { cardCountModal } from './styles.scss';

const CardCountModal = ({ card, closeModal }) => {
	const { setCount } = useCards();
	const [internalCount, setInternalCount] = useState(card.count || 1);
	const updateInternalCount = useCallback((event) => {
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
