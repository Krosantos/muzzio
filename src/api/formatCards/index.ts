import getPartner from './getPartner';
import getIsUnlimited from './getIsUnlimited';
import processCardFaces from './processCardFaces';

type FormatCard = (card:RawCard)=>Card
const formatCard:FormatCard = (card) => {
  const {
    id,
    cmc,
    color_identity: identity,
  } = card;
  const { imageUrl, reverseUrl, face } = processCardFaces(card);
  const {
    colors,
    name,
    mana_cost: cost,
    type_line: type,
  } = face;
  const partnerQuery = getPartner(card);
  const isUnlimited = getIsUnlimited(card);

  return {
    attributes: {},
    cmc,
    colors,
    cost,
    count: 0,
    id,
    identity,
    imageUrl,
    isUnlimited,
    name,
    partnerQuery,
    reverseUrl,
    sideboardCount: 0,
    type,
  };
};

type FormatCards = (cards:RawCard[])=>Card[]
const formatCards:FormatCards = (cards) => cards.map(formatCard);

export default formatCards;
