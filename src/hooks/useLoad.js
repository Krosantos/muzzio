import fs from 'fs';
import { useCallback } from 'react';

const useLoad = (filePath) => {
	const load = useCallback(() => {
		try {
			const data = fs.readFileSync(filePath, 'utf8');

			return JSON.parse(data);
		} catch (e) {
			return {};
		}
	}, [filePath]);

	return load;
};

export default useLoad;
