import React, { useCallback, useMemo } from 'react';
import ModalContainer from '@components/ModalContainer';
import useOverwrite from '@hooks/useOverwrite';
import {
	COMMANDER,
	OATHBREAKER,
} from '@constants';
import { formatModal, formatButton } from './styles.scss';

const formatMap = {
	[COMMANDER]: 'Commander',
	[OATHBREAKER]: 'Oathbreaker',
};

const FormatButton = ({ format, closeModal }) => {
	const overwrite = useOverwrite();
	const newDeck = useCallback((event) => {
		event.preventDefault();
		overwrite({ format });
		closeModal();
	});
	const buttonName = useMemo(() => formatMap[format], [format]);

	return (
		<button
			className={formatButton}
			onClick={newDeck}
			type="button"
		>
			{buttonName}
		</button>
	);
};

const FormatModal = ({ closeModal }) => (
	<ModalContainer closeModal={closeModal}>
		<div className={formatModal}>
			<FormatButton closeModal={closeModal} format={COMMANDER} />
			<FormatButton closeModal={closeModal} format={OATHBREAKER} />
		</div>
	</ModalContainer>
);

export default FormatModal;
