import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import FormatModal from './FormatModal';
import { saveLoadButton } from './styles.scss';

const NEW = 'New';

const NewButton = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const openModal = useCallback(() => {
		setModalOpen(true);
	}, []);
	const closeModal = useCallback(() => {
		setModalOpen(false);
	}, []);

	return (
		<>
			<button
				className={saveLoadButton}
				onClick={openModal}
				type="button"
			>
				{NEW}
			</button>
			{isModalOpen
			&& ReactDOM.createPortal(
				<FormatModal closeModal={closeModal} />,
				document.querySelector('body'),
			)}
		</>
	);
};

export default NewButton;
