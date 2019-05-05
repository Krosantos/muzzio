import { useContext, useCallback } from 'react';
import filter from 'lodash/filter';
import set from 'lodash/set';
import unset from 'lodash/unset';
import { CardContext } from '@contexts/Card';
import {
	ADD_ACTION,
	REMOVE_ACTION,
	UPDATE_ACTION,
} from '@constants';

const useCards = () => {
	const { cards, dispatch } = useContext(CardContext);
	const cardsByAttribute = useCallback((attribute) => filter(cards, (card) => card.attributes[attribute]), [cards]);
	const addCard = useCallback((card) => dispatch({ card, type: ADD_ACTION }), []);
	const removeCard = useCallback((card) => dispatch({ card, type: REMOVE_ACTION }), []);
	const addAttribute = useCallback((card, attribute) => {
		const toAdd = set(card, ['attributes', attribute], true);

		dispatch({ card: toAdd, type: UPDATE_ACTION });
	}, []);
	const removeAttribute = useCallback((card, attribute) => {
		const toAdd = unset(card, ['attributes', attribute]);

		dispatch({ card: toAdd, type: UPDATE_ACTION });
	}, []);

	return {
		addAttribute,
		addCard,
		cards,
		cardsByAttribute,
		removeAttribute,
		removeCard,
	};
};

export default useCards;
