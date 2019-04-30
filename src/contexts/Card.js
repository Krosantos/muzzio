import React, { useReducer, useMemo } from 'react';
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
		newState[id] = card;
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
