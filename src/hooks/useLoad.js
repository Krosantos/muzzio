import fs from 'fs';
import { useCallback } from 'react';

const useLoad = (filePath) => {
	const load = useCallback(() => {
		const data = fs.readFileSync(filePath, 'utf8');

		return JSON.parse(data);
	}, [filePath]);

	return load;
};

export default useLoad;
