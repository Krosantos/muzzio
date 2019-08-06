import get from 'lodash/get';

const getTransformData = (cardFaces) => {
	const result = {};

	result.face = get(cardFaces, 0);
	result.imageUrl = get(cardFaces, [0, 'image_uris', 'png']);
	result.reverseUrl = get(cardFaces, [1, 'image_uris', 'png']);
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

	result.face = card;
	result.imageUrl = get(imageUris, 'png');

	return result;
};

export default processCardFaces;
