import get from 'lodash/get';
import formatCards from './formatCards';
import api from '.';

// eslint-disable-next-line max-statements
const getCardById = async (id) => {
	try {
		const response = await api.get(id);
		const card = get(response, 'data', {});

		return formatCards([card])[0];
	} catch {
		return {};
	}
};

export default getCardById;
