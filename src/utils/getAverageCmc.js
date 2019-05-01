const getAverageCmc = (cards) => {
	const running = Object.keys(cards).reduce((sum, id) => (cards[id].cmc || 0) + sum, 0);

	if (!Object.keys(cards).length)
		return 0;
	return running / Object.keys(cards).length;
};

export default getAverageCmc;
