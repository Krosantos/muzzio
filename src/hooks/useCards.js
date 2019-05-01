import { useContext } from 'react';
import { CardContext } from '@contexts/Card';
import filter from 'lodash/filter';

const useCards = (attribute) => {
	const { cards } = useContext(CardContext);

	if (!attribute)
		return cards;
	const valid = filter(cards, (card) => card.attributes[attribute]);

	return valid;
};

export default useCards;
