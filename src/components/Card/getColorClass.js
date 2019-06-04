import get from 'lodash/get';
import { IS_IN_DECK, IS_IN_SIDEBOARD } from '@constants';
import {
	white,
	blue,
	black,
	red,
	green,
	multi,
	colorless,
	outOfDeck,
} from './styles.scss';

const colorMap = {
	B: black,
	G: green,
	R: red,
	U: blue,
	W: white,
};

// eslint-disable-next-line complexity
const getColorClass = ({ attributes, colors = [] }, alwaysColorful) => {
	const inDeck = get(attributes, IS_IN_DECK, false);
	const inSideboard = get(attributes, IS_IN_SIDEBOARD, false);
	const notInDeck = (!inDeck && !inSideboard && !alwaysColorful);

	if (notInDeck)
		return outOfDeck;
	if (colors.length < 1)
		return colorless;
	if (colors.length > 1)
		return multi;
	return colorMap[colors[0]];
};

export default getColorClass;
