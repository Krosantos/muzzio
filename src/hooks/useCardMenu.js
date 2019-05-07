import { useCallback, useContext, useMemo } from 'react';
import { CardMenuContext } from '@contexts/CardMenu';
import get from 'lodash/get';

// eslint-disable-next-line max-statements
const useCardMenu = () => {
	const { cardMenu, setCardMenu } = useContext(CardMenuContext);

	const card = useMemo(() => get(cardMenu, 'card'), [cardMenu]);
	const isOpen = useMemo(() => get(cardMenu, 'isOpen', false), [cardMenu]);
	const x = useMemo(() => get(cardMenu, 'coordinates.x'), [cardMenu]);
	const y = useMemo(() => get(cardMenu, 'coordinates.y'), [cardMenu]);

	const openMenu = useCallback((event, cardIn) => {
		const { clientX, clientY } = event;
		const toSet = {
			card: cardIn,
			coordinates: {
				x: clientX,
				y: clientY,
			},
			isOpen: true,
		};

		setCardMenu(toSet);
	}, []);

	const closeMenu = useCallback(() => {
		setCardMenu({ isOpen: false });
	}, []);

	return {
		card,
		closeMenu,
		isOpen,
		openMenu,
		x,
		y,
	};
};

export default useCardMenu;
