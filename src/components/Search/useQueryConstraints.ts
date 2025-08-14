import { useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import useFormat from "@hooks/useFormat";
import useCommander from "@hooks/useCommander";
import { OATHBREAKER, COMMANDER } from "@constants";
import { useOathbreaker } from "@contexts/Oathbreaker";

type ConvertIdentityToQuery = (identity: string[]) => string;
const convertIdentityToQuery: ConvertIdentityToQuery = (identity) => {
  if (!identity) return "";
  if (!identity.length) return " identity:c";
  return ` identity:${identity.join("")}`;
};

type GetFormatQuery = (format: string) => string;
const getFormatQuery: GetFormatQuery = (format) => {
  return `format:${format}`;
};

type GetIdentityQuery = (
  format: string,
  commanderIdentity: string[],
  oathbreakerIdentity: string[],
) => string;
const getIdentityQuery: GetIdentityQuery = (
  format,
  commanderIdentity,
  oathbreakerIdentity,
) => {
  if (format === COMMANDER) return convertIdentityToQuery(commanderIdentity);
  if (format === OATHBREAKER) return convertIdentityToQuery(oathbreakerIdentity);
  return "";
};

type HasIdentity = (format: string, commander?: Card, oathbreaker?: Card) => boolean;
const hasIdentity: HasIdentity = (format, commander, oathbreaker) => {
  if (format === COMMANDER) return !isEmpty(commander);
  if (format === OATHBREAKER) return !isEmpty(oathbreaker);
  return false;
};

type UseQueryConstraints = (bypassIdentity: boolean) => string;
const useQueryConstraints: UseQueryConstraints = (bypassIdentity) => {
  const { format } = useFormat();
  const { commander, colorIdentity: commanderIdentity } = useCommander();
  const { oathbreaker, colorIdentity: oathbreakerIdentity } = useOathbreaker();
  const query = useMemo(() => {
    const formatQuery = getFormatQuery(format);

    if (!hasIdentity(format, commander, oathbreaker) || bypassIdentity)
      return formatQuery;
    const identityQuery = getIdentityQuery(
      format,
      commanderIdentity,
      oathbreakerIdentity,
    );

    return `${formatQuery} ${identityQuery} prefer:newest`;
  }, [
    format,
    commander,
    oathbreaker,
    bypassIdentity,
    commanderIdentity,
    oathbreakerIdentity,
  ]);

  return query;
};

export default useQueryConstraints;
