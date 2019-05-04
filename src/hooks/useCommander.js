import { useContext, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import { CommanderContext } from '@contexts/Commander';

const convertIdentityToCost = (identity) => {
	if (identity.length === 0)
		return '{C}';
	return `{${identity.join('}{')}}`;
};

const calculateIdentity = (commanderData) => {
	const commanderIdentity = get(commanderData, 'commander.identity', []);
	const partnerIdentity = get(commanderData, 'partner.identity', []);

	const identities = uniq(concat(commanderIdentity, partnerIdentity));

	return convertIdentityToCost(identities);
};

const useCommander = () => {
	const { commanderData, dispatch } = useContext(CommanderContext);

	const setCommander = useCallback((commander) => {
		dispatch({ commander });
	}, []);
	const setPartner = useCallback((partner) => {
		dispatch({ partner });
	}, []);
	const colorIdentity = useMemo(() => calculateIdentity(commanderData));

	const commander = useMemo(() => get(commanderData, 'commander.name', ''));
	const partner = useMemo(() => get(commanderData, 'partner.name', ''));

	return {
		colorIdentity,
		commander,
		partner,
		setCommander,
		setPartner,
	};
};

export default useCommander;
