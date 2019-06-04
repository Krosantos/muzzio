import getPartner from './getPartner';
import processCardFaces from './processCardFaces';

const formatCard = (card) => {
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

	return {
		attributes: {},
		cmc,
		colors,
		cost,
		count: 0,
		id,
		identity,
		imageUrl,
		name,
		partnerQuery,
		reverseUrl,
		type,
	};
};

const formatCards = (cards) => cards.map(formatCard);

export default formatCards;
