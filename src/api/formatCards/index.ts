import getPartner from "./getPartner";
import getIsUnlimited from "./getIsUnlimited";
import processCardFaces from "./processCardFaces";
import mapLegalities from "./mapLegalities";

type FormatCard = (card: RawCard) => Card;
const formatCard: FormatCard = (card) => {
  try {
    const { id, cmc, color_identity: identity } = card;
    const { imageUrl, reverseUrl, face, colorIdentity } = processCardFaces(card);
    const { colors, name, mana_cost: cost, type_line: type } = face;
    const partnerQuery = getPartner(card);

    const isUnlimited = getIsUnlimited(card);
    const legalFormats = mapLegalities(card);

    return {
      attributes: {},
      cmc,
      colors,
      colorIdentity,
      cost,
      count: 0,
      id,
      identity,
      imageUrl,
      isUnlimited,
      legalFormats,
      name,
      partnerQuery,
      reverseUrl,
      sideboardCount: 0,
      type,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

type FormatCards = (cards: RawCard[]) => Card[];
const formatCards: FormatCards = (cards) => cards.map(formatCard).filter((t) => !!t);

export default formatCards;
