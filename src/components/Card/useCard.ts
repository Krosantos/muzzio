import { useMemo } from 'react';
import useCards from '@hooks/useCards';

type UseCard =(cardId:string, rawCard:Card)=>Card
const useCard:UseCard = (cardId, rawCard) => {
  const { getCard } = useCards();
  const card = useMemo(() => getCard(cardId) || rawCard, [cardId, getCard, rawCard]);

  return card;
};

export default useCard;
