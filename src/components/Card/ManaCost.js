/* eslint-disable react/no-array-index-key */
import React from 'react';
import symbolMap from './symbolMap';
import { manaCost, manaSymbol } from './styles.scss';

const splitMana = (cost) => {
	const fragments = cost.split(/}{/);

	return fragments.map((fragment) => fragment.replace(/[}{]/g, ''));
};

const Symbol = ({ costFragment }) => {
	const src = symbolMap[costFragment];

	return (<img alt="" className={manaSymbol} src={src} />);
};

const ManaCost = ({ cost }) => {
	const fragments = splitMana(cost);

	return (
		<div className={manaCost}>
			{fragments.map((fragment, index) => <Symbol key={index} costFragment={fragment} />)}
		</div>
	);
};

export default ManaCost;
