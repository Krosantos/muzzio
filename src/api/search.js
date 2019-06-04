import get from 'lodash/get';
import formatCards from './formatCards';
import api from '.';

// eslint-disable-next-line max-statements
const search = async (query) => {
	let newQuery = query;

	newQuery += ' game:paper order:cmc';
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
