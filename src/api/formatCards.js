import get from 'lodash/get';

/* eslint-disable camelcase, max-statements */
const formatCard = (card) => {
	const {
		card_faces = [],
		colors,
		cmc,
		name,
		mana_cost,
		layout,
		image_uris,
	} = card;

	let imageUrl;

	let reverseUrl;

	if (layout === 'transform') {
		imageUrl = get(card_faces, [0, 'image_uris', 'normal']);
		reverseUrl = get(card_faces, [1, 'image_uris', 'normal']);
	} else {
		imageUrl = get(image_uris, 'normal');
	}

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
