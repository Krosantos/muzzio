import get from 'lodash/get';

/* eslint-disable camelcase, max-statements */
const formatCard = (card) => {
	const { card_faces, image_uris, layout } = card;

	let imageUrl;

	let reverseUrl;

	let face;

	if (layout === 'transform') {
		face = get(card_faces, 0);
		imageUrl = get(card_faces, [0, 'image_uris', 'normal']);
		reverseUrl = get(card_faces, [1, 'image_uris', 'normal']);
	} else {
		face = card;
		imageUrl = get(image_uris, 'normal');
	}
	const {
		colors,
		cmc,
		name,
		mana_cost,
	} = face;

	return {
		cmc,
		colors,
		cost: mana_cost,
		imageUrl,
		name,
		reverseUrl,
	};
};

const formatCards = (cards) => cards.map(formatCard);

export default formatCards;
