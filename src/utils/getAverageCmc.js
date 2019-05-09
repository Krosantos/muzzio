import includes from 'lodash/includes';
import filter from 'lodash/filter';

const getAverageCmc = (cards) => {
	const running = Object.keys(cards).reduce((sum, id) => (cards[id].cmc || 0) + sum, 0);

	const nonLandCards = filter(cards, (card) => includes(card.type, 'Land'));

	if (!nonLandCards.length)
		return 0;
	return running / (nonLandCards.length + 12);
};

export default getAverageCmc;
