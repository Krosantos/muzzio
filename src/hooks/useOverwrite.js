import { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import { CardContext } from '@contexts/Card';
import { AttributesContext } from '@contexts/Attributes';
import { OathbreakerContext } from '@contexts/Oathbreaker';
import { FormatContext } from '@contexts/Format';
import { BasicLandContext } from '@contexts/BasicLand';
import {
	ALL_CARDS,
	OVERWRITE,
	COMMANDER,
} from '@constants';

// eslint-disable-next-line max-statements
const useOverwrite = () => {
	const { setAttributes } = useContext(AttributesContext);
	const { setBasicLand } = useContext(BasicLandContext);
	const { dispatch: cardsDispatch } = useContext(CardContext);
	const { setCommanderData } = useContext(CommanderContext);
	const { setOathbreakerData } = useContext(OathbreakerContext);
	const { setFormat } = useContext(FormatContext);

	const overwrite = useCallback((saveData = {}) => {
		const {
			attributes = [ALL_CARDS],
			basicLand = {},
			cards = {},
			commanderData = {},
			format = COMMANDER,
			oathbreakerData = {},
		} = saveData;

		setFormat(format);
		setOathbreakerData(oathbreakerData);
		setAttributes(attributes);
		setBasicLand(basicLand);
		cardsDispatch({ card: cards, type: OVERWRITE });
		setCommanderData(commanderData);
	}, []);

	return overwrite;
};

export default useOverwrite;
