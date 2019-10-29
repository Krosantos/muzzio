import { useCallback, useState } from 'react';

const useHoverArt = () => {
	const [shouldShowArt, setShowArt] = useState(false);
	const hideArt = useCallback(() => setShowArt(false), []);
	const showArt = useCallback(() => setShowArt(true), []);

	return { hideArt, shouldShowArt, showArt };
};

export default useHoverArt;
