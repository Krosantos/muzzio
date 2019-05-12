import { useMemo } from 'react';
import useCards from '@hooks/useCards';

const useCard = (cardId, rawCard) => {
	const { getCard } = useCards();
	const card = useMemo(() => getCard(cardId) || { ...rawCard, overrideColor: true }, [cardId, getCard, rawCard]);

	return card;
};

export default useCard;