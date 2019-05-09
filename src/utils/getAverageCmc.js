import values from 'lodash/values';

const getAverageCmc = (cardObject) => {
	const cards = values(cardObject);
	const nonLand = cards.filter((card) => !card.type.includes('Land'));
	const totalMana = cards.reduce((prev, curr) => (prev + curr.cmc), 0);

	return totalMana / nonLand.length;
};

export default getAverageCmc;
