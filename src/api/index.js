import axios from 'axios';
import get from 'lodash/get';
import formatCards from './formatCards';

const createConnection = () => {
	const connection = axios.create({
		baseURL: 'https://api.scryfall.com/cards/search',
		timeout: 10000,
	});

	connection.interceptors.request.use((config) => {
		const newConfig = { ...config };

		return newConfig;
	});

	connection.interceptors.response.use(
		(response) => {
			const cards = get(response, 'data.data', []);

			return formatCards(cards);
		},
	);

	return connection;
};

export default createConnection();
