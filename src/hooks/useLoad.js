import fs from 'fs';
import { useCallback } from 'react';

const useLoad = () => {
	const load = useCallback((filePath) => {
		try {
			const raw = fs.readFileSync(filePath).toString('utf8');
			// const data = Buffer.from(raw, 'base64').toString('utf8');

			return JSON.parse(raw);
		} catch (e) {
			return {};
		}
	}, []);

	return load;
};

export default useLoad;
