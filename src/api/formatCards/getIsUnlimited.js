import get from 'lodash/get';
import extractOracleText from './extractOracleText';

const ANY_NUMBER_RULE = 'A deck can have any number of cards named';
const BASIC_LAND = 'Basic Land';

const getMaxCount = (card) => {
	const type = get(card, 'type_line');
	const oracleText = extractOracleText(card);

	return (type.includes(BASIC_LAND) || oracleText.includes(ANY_NUMBER_RULE));
};

export default getMaxCount;
