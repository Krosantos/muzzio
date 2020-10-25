import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
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

const hasIdentity = (format, commander, oathbreaker) => {
  if (format === COMMANDER)
    return !isEmpty(commander);
  if (format === OATHBREAKER)
    return !isEmpty(oathbreaker);
  return false;
};

const useQueryConstraints = (bypassIdentity) => {
  const { format } = useFormat();
  const { commander, colorIdentity: commanderIdentity } = useCommander();
  const { oathbreaker, colorIdentity: oathbreakerIdentity } = useOathbreaker();
  const query = useMemo(() => {
    const formatQuery = getFormatQuery(format);

    if (!hasIdentity(format, commander, oathbreaker) || bypassIdentity)
      return formatQuery;
    const identityQuery = getIdentityQuery(format, commanderIdentity, oathbreakerIdentity);

    return `${formatQuery} ${identityQuery} prefer:newest`;
  }, [format, commander, oathbreaker, bypassIdentity, commanderIdentity, oathbreakerIdentity]);

  return query;
};

export default useQueryConstraints;
