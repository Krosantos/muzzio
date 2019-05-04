import {
	ANY_PARTNER,
	SPECIFIC_PARTNER,
	NO_PARTNER,
} from '@constants';

const getPartner = (card) => {
	const {
		all_parts: allParts,
		name,
		oracle_text: oracleText,
	} = card;

	if (oracleText.includes('Partner with')) {
		const partner = allParts.find(({ component, name: partName }) => component === 'combo_piece' && partName !== name);

		return { query: ` !"${partner.name}"`, type: SPECIFIC_PARTNER };
	}
	if (oracleText.includes('Partner'))
		return { query: ` -"${name}"`, type: ANY_PARTNER };
	return { type: NO_PARTNER };
};

export default getPartner;
