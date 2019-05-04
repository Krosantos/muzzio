import api from '.';

const search = async (query, commander) => {
	let newQuery = query;

	newQuery += ' f:commander game:paper order:cmc';
	if (commander && commander.identity)
		newQuery += ` identity:${commander.identity}`;
	const config = {
		params: {
			q: newQuery,
		},
	};
	const result = await api.get('', config);

	// console.log(result);
	return result;
};

export default search;
