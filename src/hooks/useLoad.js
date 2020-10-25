import fs from 'fs';
import { useCallback } from 'react';

const useLoad = () => {
	const load = useCallback((filePath) => {
		try {
			const raw = fs.readFileSync(filePath).toString('utf8');

			console.log('gucci', raw);
			return JSON.parse(raw);
		} catch (e) {
			console.log(e);
			return {};
		}
	}, []);

	return load;
};

export default useLoad;
