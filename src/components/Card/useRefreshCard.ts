import { useCallback } from "react";
import getCardById from "@api/getCardById";
import useCards from "@hooks/useCards";

type UseRefreshCard = (id: string) => () => Promise<void>;
const useRefreshCard: UseRefreshCard = (id) => {
  const { addCard } = useCards();
  const refreshedCard = useCallback(async () => {
    const newCard = await getCardById(id);

    addCard(newCard);
  }, [addCard, id]);

  return refreshedCard;
};

export default useRefreshCard;
