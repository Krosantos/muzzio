import get from 'lodash/get';
import formatCards from './formatCards';
import api from '.';

const search = async (query) => {
	let newQuery = query;

	newQuery += ' game:paper not:promo order:cmc';
	const config = {
		params: {
			q: newQuery,
		},
	};

	try {
		const response = await api.get('search', config);
		const cards = get(response, 'data.data', []);

		return formatCards(cards);
	} catch {
		return [];
	}
};

export default search;
