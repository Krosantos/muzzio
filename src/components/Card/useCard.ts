import { useCards } from "@contexts/Card";
import { useMemo } from "react";

type UseCard = (name: string, rawCard: Card) => Card;
const useCard: UseCard = (name, rawCard) => {
  const cardData = useCards((s) => s.cardData[name]);
  const card = useMemo(() => cardData || rawCard, [cardData, rawCard]);

  return card;
};

export default useCard;
