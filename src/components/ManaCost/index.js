/* eslint-disable react/no-array-index-key */
import React from 'react';
import symbolMap from './symbolMap';
import { manaCost, manaSymbol } from './styles.scss';

const SLASHES = '//';

const splitCosts = (cost) => {
	const costs = cost.split(/ \/\/ /);

	return costs;
};

const splitMana = (cost) => {
	const fragments = cost.split(/}{/);

	return fragments.map((fragment) => fragment.replace(/[}{]/g, ''));
};

const Symbol = ({ costFragment }) => {
	const src = symbolMap[costFragment];

	return (<img alt="" className={manaSymbol} src={src} />);
};

const ManaCost = ({ cost }) => {
	const [frontCost, backCost] = splitCosts(cost);

	return (
		<div className={manaCost}>
			<Cost cost={frontCost} />
			{backCost
			&& (
			<>
				<span>{SLASHES}</span>
				<Cost cost={backCost} />
			</>
			)
			}
		</div>
	);
};
const Cost = ({ cost }) => {
	if (!cost)
		return null;
	const fragments = splitMana(cost);

	return (
		<>
			{fragments.map((fragment, index) => <Symbol key={index} costFragment={fragment} />)}
		</>
	);
};

export default React.memo(ManaCost);
