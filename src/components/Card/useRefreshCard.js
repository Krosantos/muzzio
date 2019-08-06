import { useCallback } from 'react';
import getCardById from '@api/getCardById';
import useCards from '@hooks/useCards';

const useRefreshCard = (id) => {
	const { addCard } = useCards();
	const repairImage = useCallback(async () => {
		const newCard = await getCardById(id);

		addCard(newCard);
	}, [id]);

	return repairImage;
};

export default useRefreshCard;
