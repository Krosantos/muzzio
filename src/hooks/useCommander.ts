import { useContext, useMemo, useCallback } from "react";
import get from "lodash/get";
import concat from "lodash/concat";
import uniq from "lodash/uniq";
import assign from "lodash/assign";
import { CommanderContext, CommanderData } from "@contexts/Commander";

type CalculateIdentity = (commanderData: CommanderData) => string[];
const calculateIdentity: CalculateIdentity = (commanderData) => {
  const commanderIdentity = get(commanderData, "commander.identity", []);
  const partnerIdentity = get(commanderData, "partner.identity", []);
  const identities = uniq(concat(commanderIdentity, partnerIdentity));

  if (identities.length < 1) identities.push("C");
  return identities;
};

type UseCommander = () => {
  colorIdentity: string[];
  commander: Card;
  partner: Card;
  partnerQuery: Card["partnerQuery"];
  setCommander: (commander: Card) => void;
  setPartner: (partner: Card) => void;
};
const useCommander: UseCommander = () => {
  const { commanderData, setCommanderData } = useContext(CommanderContext);

  const setCommander = useCallback(
    (commander: Card) => {
      const toSet = assign({}, commanderData, { commander, partner: {} });

      setCommanderData(toSet);
    },
    [commanderData, setCommanderData],
  );

  const setPartner = useCallback(
    (partner: Card) => {
      const toSet = assign({}, commanderData, { partner });

      setCommanderData(toSet);
    },
    [commanderData, setCommanderData],
  );

  const colorIdentity = useMemo(() => calculateIdentity(commanderData), [commanderData]);
  const commander = useMemo(() => get(commanderData, "commander", {}), [commanderData]);
  const partner = useMemo(() => get(commanderData, "partner", {}), [commanderData]);
  const partnerQuery = useMemo<Card["partnerQuery"]>(
    () => commanderData.commander?.partnerQuery,
    [commanderData],
  );

  return {
    colorIdentity,
    commander,
    partner,
    partnerQuery,
    setCommander,
    setPartner,
  };
};

export default useCommander;
