/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';
import useCommander from '@hooks/useCommander';
import CardList from '../CardList';
import Search from '../Search';
import { modal, underlay } from './styles.scss';

const LEGENDARY_CREATURE_QUERY = ' t:legendary t:creature';

const Modal = ({
	closeModal,
}) => {
	const trapClick = useCallback((event) => event.stopPropagation());
	const { setCommander, setPartner } = useCommander();
	const [results, setResults] = useState([]);

	return (
		<div className={underlay} onClick={closeModal}>
			<div className={modal} onClick={trapClick}>
				<Search
					additionalConstraint={LEGENDARY_CREATURE_QUERY}
					ignoreCommander
					setResults={setResults}
				/>
				<CardList callback={setCommander} cards={results} />
			</div>
		</div>
	);
};

export default Modal;
