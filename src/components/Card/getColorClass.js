import get from 'lodash/get';
import { IS_IN_DECK } from '@constants';
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
	const notInDeck = (!get(attributes, IS_IN_DECK, false) && !alwaysColorful);

	if (notInDeck)
		return outOfDeck;
	if (colors.length < 1)
		return colorless;
	if (colors.length > 1)
		return multi;
	return colorMap[colors[0]];
};

export default getColorClass;
