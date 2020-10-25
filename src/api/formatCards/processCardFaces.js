import get from 'lodash/get';

const getTransformData = (cardFaces) => {
	const result = {};

	result.face = get(cardFaces, 0);
	result.imageUrl = get(cardFaces, [0, 'image_uris', 'border_crop']);
	result.reverseUrl = get(cardFaces, [1, 'image_uris', 'border_crop']);
	return result;
};

const getDfcData = (card) => {
	const result = {};

	result.face = get(card, ['card_faces', 0]);
	result.face.name = get(card, 'name');
	result.face.type_line = get(card, 'type_line');
	result.imageUrl = get(card, ['card_faces', 0, 'image_uris', 'border_crop']);
	result.reverseUrl = get(card, 'card_faces', [1, 'image_uris', 'border_crop']);
	return result;
};

const processCardFaces = (card) => {
	const {
		card_faces: cardFaces,
		layout,
		image_uris: imageUris,
	} = card;

	const result = {};

	if (layout === 'transform')
		return getTransformData(cardFaces);
	if (layout === 'modal_dfc')
		return getDfcData(card);
	result.face = card;
	result.imageUrl = get(imageUris, 'border_crop');

	return result;
};

export default processCardFaces;
