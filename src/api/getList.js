import get from 'lodash/get';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import formatCards from './formatCards';
import api from '.';

const getList = async (identifiers) => {
	const chunks = chunk(identifiers, 75);

	const calls = chunks.map((body) => api.post('collection', { identifiers: body }));
	const responses = await Promise.all(calls);

	const rawCards = responses.map((response) => get(response, 'data.data'), []);

	return formatCards(flatten(rawCards));
};

export default getList;
