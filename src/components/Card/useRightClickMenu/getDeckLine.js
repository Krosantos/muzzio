import get from 'lodash/get';
import { IS_IN_DECK } from '@constants';
import { remote } from 'electron';

const { MenuItem } = remote;

// eslint-disable-next-line max-params
const getDeckLine = (isSingleton, card, menu, addAttribute, removeAttribute) => {
	if (!isSingleton)
		return;
	const isInDeck = get(card, ['attributes', IS_IN_DECK], false);

	if (isInDeck) {
		menu.append(
			new MenuItem({ click() { removeAttribute(card, IS_IN_DECK); }, label: 'Remove From Deck' }),
		);
	} else {
		menu.append(
			new MenuItem({ click() { addAttribute(card, IS_IN_DECK); }, label: 'Add to Deck' }),
		);
	}
};

export default getDeckLine;
