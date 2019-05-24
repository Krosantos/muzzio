import { useMemo } from 'react';
import useFormat from '@hooks/useFormat';
import useCommander from '@hooks/useCommander';
import useOathbreaker from '@hooks/useOathbreaker';
import {
	OATHBREAKER,
	COMMANDER,
	VINTAGE,
	oathbreakerBanlist,
} from '@constants';

const convertIdentityToQuery = (identity) => {
	if (!identity)
		return '';
	if (!identity.length)
		return ' identity:c';
	return ` identity:${identity.join('')}`;
};

const getFormatQuery = (format) => {
	if (format !== OATHBREAKER)
		return `format:${format}`;
	const bannedSection = oathbreakerBanlist.join('" -"');

	return `format:${VINTAGE} -"${bannedSection}"`;
};

const getIdentityQuery = (format, commanderIdentity, oathbreakerIdentity) => {
	if (format === COMMANDER)
		return convertIdentityToQuery(commanderIdentity);
	if (format === OATHBREAKER)
		return convertIdentityToQuery(oathbreakerIdentity);
	return '';
};

const useQueryConstraints = () => {
	const { format } = useFormat();
	const { colorIdentity: commanderIdentity } = useCommander();
	const { colorIdentity: oathbreakerIdentity } = useOathbreaker();
	const query = useMemo(() => {
		const formatQuery = getFormatQuery(format);
		const identityQuery = getIdentityQuery(format, commanderIdentity, oathbreakerIdentity);

		return `${formatQuery} ${identityQuery}`;
	}, [format, commanderIdentity, oathbreakerIdentity]);

	return query;
};

export default useQueryConstraints;
