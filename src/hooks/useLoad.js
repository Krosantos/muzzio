import fs from 'fs';
import { useCallback } from 'react';

const useLoad = () => {
	const load = useCallback((filePath) => {
		try {
			const data = fs.readFileSync(filePath, 'utf8');

			return JSON.parse(data);
		} catch (e) {
			return {};
		}
	}, []);

	return load;
};

export default useLoad;
