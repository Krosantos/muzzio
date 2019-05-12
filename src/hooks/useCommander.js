import { useContext, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import assign from 'lodash/assign';
import { CommanderContext } from '@contexts/Commander';

const calculateIdentity = (commanderData) => {
	const commanderIdentity = get(commanderData, 'commander.identity', []);
	const partnerIdentity = get(commanderData, 'partner.identity', []);
	const identities = uniq(concat(commanderIdentity, partnerIdentity));

	if (identities.length < 1)
		identities.push('C');
	return identities;
};

// eslint-disable-next-line max-statements
const useCommander = () => {
	const { commanderData, setCommanderData } = useContext(CommanderContext);

	const setCommander = useCallback((commander) => {
		const toSet = assign({}, commanderData, { commander, partner: {} });

		setCommanderData(toSet);
	}, [commanderData]);

	const setPartner = useCallback((partner) => {
		const toSet = assign({}, commanderData, { partner });

		setCommanderData(toSet);
	});

	const colorIdentity = useMemo(() => calculateIdentity(commanderData), [commanderData]);
	const commander = useMemo(() => get(commanderData, 'commander'), [commanderData]);
	const partner = useMemo(() => get(commanderData, 'partner'), [commanderData]);
	const partnerQuery = useMemo(() => get(commanderData, 'commander.partnerQuery'), [commanderData]);

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
