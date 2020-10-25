import getPartner from './getPartner';
import getIsUnlimited from './getIsUnlimited';
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
	const isUnlimited = getIsUnlimited(card);

	const result = {
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

	return result;
};

const formatCards = (cards) => cards.map(formatCard);

export default formatCards;
