import includes from 'lodash/includes';
import filter from 'lodash/filter';
import values from 'lodash/values';

const getAverageCmc = (cardObject) => {
	const cards = values(cardObject);
	const nonLand = cards.filter((card) => !card.type.includes('Land'));

	const totalMana = cards.reduce((prev, curr) => (prev + curr.cmc), 0);

	console.log(nonLand.length);
	// cards.forEach((card) => console.log(card.type));
	return totalMana / nonLand.length;
};

export default getAverageCmc;
