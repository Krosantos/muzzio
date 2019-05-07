import { useContext, useCallback } from 'react';
import filter from 'lodash/filter';
import get from 'lodash/get';
import has from 'lodash/has';
import set from 'lodash/set';
import unset from 'lodash/unset';
import { CardContext } from '@contexts/Card';
import {
	ADD_ACTION,
	REMOVE_ACTION,
	UPDATE_ACTION,
} from '@constants';

// eslint-disable-next-line max-statements
const useCards = () => {
	const { cards, dispatch } = useContext(CardContext);
	const cardsByAttribute = useCallback((attribute) => filter(cards, (card) => get(card, ['attributes', attribute], false)), [cards]);
	const addCard = useCallback((card) => dispatch({ card, type: ADD_ACTION }), []);
	const removeCard = useCallback((card) => dispatch({ card, type: REMOVE_ACTION }), []);
	const cardExists = useCallback((card) => {
		const id = get(card, 'id');

		return id && has(cards, id);
	}, [cards]);
	const addAttribute = useCallback((card, attribute) => {
		const toAdd = set(card, ['attributes', attribute], true);

		dispatch({ card: toAdd, type: UPDATE_ACTION });
	}, []);
	const removeAttribute = useCallback((card, attribute) => {
		const toDispatch = { ...card };

		unset(toDispatch, ['attributes', attribute]);

		dispatch({ card: toDispatch, type: UPDATE_ACTION });
	}, []);

	return {
		addAttribute,
		addCard,
		cards,
		cardsByAttribute,
		cardExists,
		removeAttribute,
		removeCard,
	};
};

export default useCards;
