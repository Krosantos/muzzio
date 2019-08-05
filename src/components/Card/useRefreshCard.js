import { useCallback } from 'react';
import getCardById from '@api/getCardById';
import useCards from '@hooks/useCards';

const useRefreshCard = (id) => {
	const { updateCard } = useCards();
	const repairImage = useCallback(async () => {
		const newCard = await getCardById(id);

		updateCard(newCard);
	}, [id]);

	return repairImage;
};

export default useRefreshCard;
