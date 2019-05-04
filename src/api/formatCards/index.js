import getPartner from './getPartner';
import processCardFaces from './processCardFaces';

const formatCard = (card) => {
	const {
		id,
		color_identity: identity,
	} = card;
	const { imageUrl, reverseUrl, face } = processCardFaces(card);
	const {
		colors,
		cmc,
		name,
		mana_cost: cost,
	} = face;
	const partnerQuery = getPartner(card);

	return {
		attributes: {},
		cmc,
		colors,
		cost,
		id,
		identity,
		imageUrl,
		name,
		partnerQuery,
		reverseUrl,
	};
};

const formatCards = (cards) => cards.map(formatCard);

export default formatCards;
