import React, { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import ManaCost from '@components/ManaCost';
import useCards from '@hooks/useCards';
import getAverageCmc from '@utils/getAverageCmc';
import { IS_IN_DECK } from '@constants';
import { container } from './styles.scss';

const SELECT_COMMANDER_TEXT = 'Select Commander';
const CMC = 'CMC: ';
const OUT_OF_99 = '/99';

const Commander = () => {
	const { commander, setCommander } = useContext(CommanderContext);

	const cards = useCards(IS_IN_DECK);
	const count = Object.keys(cards).length;
	const cmc = getAverageCmc(cards).toPrecision(3);
	const { name = 'Niv Mizzet, Reborn', identity = '{W}{U}{B}{R}{G}' } = commander;

	return (
		<div className={container}>
			<span>
				{name || SELECT_COMMANDER_TEXT}
			</span>
			<span>
				{count}
				{OUT_OF_99}
			</span>
			<span>
				{CMC}
				{cmc}
			</span>
			<ManaCost cost={identity} />
		</div>
	);
};

export default Commander;
