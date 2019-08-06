import React from 'react';
import ModalContainer from '@components/ModalContainer';
import useSampleHand from './useSampleHand';
import {
	buttonContainer, modal, cardImage, cardContainer, modifyButton,
} from './styles.scss';

const NEW_HAND_TEXT = 'New Hand';
const ADD_CARD_TEXT = 'Add Card';

const CardSection = ({ cardsInHand }) => (
	<div className={cardContainer}>
		{cardsInHand.map(({ imageUrl, name }, index) => {
			const key = `${index}_${name}`;

			return (
				<img key={key} alt={name} className={cardImage} src={imageUrl} />
			);
		})}
	</div>
);

const ButtonSection = ({ generateNewHand, addCard }) => (
	<div className={buttonContainer}>
		<button className={modifyButton} onClick={generateNewHand} type="button">{NEW_HAND_TEXT}</button>
		<button className={modifyButton} onClick={addCard} type="button">{ADD_CARD_TEXT}</button>
	</div>
);

const SampleHandModal = ({ closeModal }) => {
	const { generateNewHand, cardsInHand, addCard } = useSampleHand();

	return (
		<ModalContainer closeModal={closeModal}>
			<div className={modal}>
				<CardSection cardsInHand={cardsInHand} />
				<ButtonSection addCard={addCard} generateNewHand={generateNewHand} />
			</div>
		</ModalContainer>
	);
};

export default SampleHandModal;
