import api from '.';

const search = async (query) => {
	let newQuery = query;

	newQuery += ' f:commander game:paper order:cmc';
	const config = {
		params: {
			q: newQuery,
		},
	};
	const result = await api.get('', config);

	return result;
};

export default search;
