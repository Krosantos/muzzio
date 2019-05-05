import get from 'lodash/get';
import formatCards from './formatCards';
import api from '.';

const search = async (query) => {
	let newQuery = query;

	newQuery += ' f:commander game:paper order:cmc';
	const config = {
		params: {
			q: newQuery,
		},
	};
	const response = await api.get('', config);
	const cards = get(response, 'data.data', []);

	return formatCards(cards);
};

export default search;
