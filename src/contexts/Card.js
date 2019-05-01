/* eslint-disable no-case-declarations */
import React, { useReducer, useMemo } from 'react';
import merge from 'lodash/merge';
import {
	ADD_ACTION,
	REMOVE_ACTION,
	UPDATE_ACTION,
} from '@constants';

const CardContext = React.createContext();

const cardReducer = (state, { type, payload }) => {
	const { id, card } = payload;
	const newState = { ...state };

	switch (type) {
	case ADD_ACTION:
		newState[id] = card;
		break;
	case REMOVE_ACTION:
		delete newState[id];
		break;
	case UPDATE_ACTION:
		const oldCard = newState[id];
		const newCard = merge(oldCard, card);

		newState[id] = newCard;
		break;
	default:
		break;
	}
	return newState;
};

const CardProvider = ({ children }) => {
	const [cards, dispatch] = useReducer(cardReducer, {});
	const value = useMemo(() => ({ cards, dispatch }), [cards]);

	return (
		<CardContext.Provider value={value}>
			{children}
		</CardContext.Provider>
	);
};

export { CardContext, CardProvider };
