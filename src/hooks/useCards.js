import { useContext, useCallback } from 'react';
import filter from 'lodash/filter';
import merge from 'lodash/merge';
import get from 'lodash/get';
import has from 'lodash/has';
import set from 'lodash/set';
import unset from 'lodash/unset';
import clamp from 'lodash/clamp';
import { CardContext } from '@contexts/Card';
import {
	IS_IN_DECK,
	IS_IN_SIDEBOARD,
	CARD_MAX,
	ADD_ACTION,
	REMOVE_ACTION,
	UPDATE_ACTION,
} from '@constants';

// eslint-disable-next-line max-statements, max-lines-per-function
const useCards = () => {
	const { cards, dispatch } = useContext(CardContext);

	const cardsByAttribute = useCallback((attribute) => filter(cards, (card) => get(card, ['attributes', attribute], false)), [cards]);

	const addCard = useCallback((card) => {
		const maybeCard = get(cards, card.id, {});
		const toAdd = merge({}, maybeCard, card);

		dispatch({ card: toAdd, type: ADD_ACTION });
	}, [cards]);

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

	const setCount = useCallback((card, count) => {
		const {
			sideboardCount = 0,
			isUnlimited = false,
		} = card;

		const clampedSideboardCount = isUnlimited
			? sideboardCount
			: clamp(sideboardCount, 0, CARD_MAX - sideboardCount);

		const toDispatch = { ...card, count, sideboardCount: clampedSideboardCount };

		set(toDispatch, ['attributes', IS_IN_DECK], count > 0);
		set(toDispatch, ['attributes', IS_IN_SIDEBOARD], clampedSideboardCount > 0);

		dispatch({ card: toDispatch, type: UPDATE_ACTION });
	}, []);

	const setSideboardCount = useCallback((card, sideboardCount) => {
		const {
			count = 0,
			isUnlimited = false,
		} = card;

		const clampedCount = isUnlimited ? count : clamp(count, 0, CARD_MAX - sideboardCount);

		const toDispatch = { ...card, count: clampedCount, sideboardCount };

		set(toDispatch, ['attributes', IS_IN_DECK], clampedCount > 0);
		set(toDispatch, ['attributes', IS_IN_SIDEBOARD], sideboardCount > 0);

		dispatch({ card: toDispatch, type: UPDATE_ACTION });
	}, []);

	const clearDeck = useCallback(() => {
		const inDeck = cardsByAttribute(IS_IN_DECK);

		inDeck.forEach((card) => {
			const toSet = { ...card };

			set(toSet, ['attributes', IS_IN_DECK], false);
			dispatch({ card: toSet, type: UPDATE_ACTION });
		});
		const inBoard = cardsByAttribute(IS_IN_SIDEBOARD);

		inBoard.forEach((card) => {
			const toSet = { ...card };

			set(toSet, ['attributes', IS_IN_SIDEBOARD], false);
			dispatch({ card: toSet, type: UPDATE_ACTION });
		});
	}, [cardsByAttribute]);

	const getCard = useCallback((id) => get(cards, id), [cards]);

	return {
		addAttribute,
		addCard,
		cardExists,
		cards,
		cardsByAttribute,
		clearDeck,
		getCard,
		removeAttribute,
		removeCard,
		setCount,
		setSideboardCount,
	};
};

export default useCards;
