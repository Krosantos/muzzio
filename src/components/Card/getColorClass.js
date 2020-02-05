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
const getColorClass = (count, sideboardCount, colors = [], alwaysColorful) => {
	const inDeck = count > 0;
	const inSideboard = sideboardCount > 0;
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
