import axios from 'axios';

const createConnection = () => {
	const connection = axios.create({
		baseURL: 'https://api.scryfall.com/cards/',
		timeout: 10000,
	});

	connection.interceptors.request.use((config) => {
		const newConfig = { ...config };

		return newConfig;
	});

	return connection;
};

export default createConnection();
