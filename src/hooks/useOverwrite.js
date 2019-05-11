import { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import { CardContext } from '@contexts/Card';
import { AttributesContext } from '@contexts/Attributes';
import { BasicLandContext } from '@contexts/BasicLand';
import { ALL_CARDS, OVERWRITE } from '@constants';

const useOverwrite = () => {
	const { setAttributes } = useContext(AttributesContext);
	const { setBasicLand } = useContext(BasicLandContext);
	const { dispatch: cardsDispatch } = useContext(CardContext);
	const { setCommanderData } = useContext(CommanderContext);

	const overwrite = useCallback((saveData = {}) => {
		const {
			attributes = [ALL_CARDS],
			basicLand = {},
			cards = {},
			commanderData = {},
		} = saveData;

		setAttributes(attributes);
		setBasicLand(basicLand);
		cardsDispatch({ card: cards, type: OVERWRITE });
		setCommanderData(commanderData);
	}, []);

	return overwrite;
};

export default useOverwrite;
