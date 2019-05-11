/* eslint-disable no-case-declarations */
import React, { useReducer, useMemo } from 'react';
import merge from 'lodash/merge';
import {
	ADD_ACTION,
	REMOVE_ACTION,
	UPDATE_ACTION,
	OVERWRITE,
} from '@constants';

const CardContext = React.createContext();

// eslint-disable-next-line complexity
const cardReducer = (state, { type, card }) => {
	const { id } = card;
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
	case OVERWRITE:
		// TODO: this is gross and you know it
		return card;
	default:
		break;
	}
	return newState;
};

const CardProvider = ({ children, initialValue = {} }) => {
	const [cards, dispatch] = useReducer(cardReducer, initialValue);
	const value = useMemo(() => ({ cards, dispatch }), [cards]);

	return (
		<CardContext.Provider value={value}>
			{children}
		</CardContext.Provider>
	);
};

export { CardContext, CardProvider };
