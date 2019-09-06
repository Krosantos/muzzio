import { useCallback } from 'react';
import getCardById from '@api/getCardById';
import useCards from '@hooks/useCards';

const useRefreshCard = (id) => {
	const { addCard } = useCards();
	const refreshedCard = useCallback(async () => {
		const newCard = await getCardById(id);

		addCard(newCard);
	}, [id]);

	return refreshedCard;
};

export default useRefreshCard;
