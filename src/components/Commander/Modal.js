/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';
import CardList from '../CardList';
import Search from '../Search';
import { modal, underlay } from './styles.scss';

const LEGENDARY_CREATURE_QUERY = ' t:"legendary creature"';

const Modal = ({
	closeModal,
	setCommander,
}) => {
	const trapClick = useCallback((event) => event.stopPropagation());
	const chooseCommander = useCallback((card) => {
		setCommander(card);
		closeModal();
	});
	const [results, setResults] = useState([]);

	return (
		<div className={underlay} onClick={closeModal}>
			<div className={modal} onClick={trapClick}>
				<Search
					additionalConstraint={LEGENDARY_CREATURE_QUERY}
					ignoreCommander
					setResults={setResults}
				/>
				<CardList callback={chooseCommander} cards={results} />
			</div>
		</div>
	);
};

export default Modal;
