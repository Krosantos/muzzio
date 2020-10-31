import { useMemo } from "react";
import useCards from "@hooks/useCards";

type UseCard = (name: string, rawCard: Card) => Card;
const useCard: UseCard = (name, rawCard) => {
  const { getCard } = useCards();
  const card = useMemo(() => getCard(name) || rawCard, [name, getCard, rawCard]);

  return card;
};

export default useCard;
