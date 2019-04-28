import React from 'react';
import ManaCost from './ManaCost';
import { card } from './styles.scss';

const Card = ({
	name = 'Footlight Fiend',
	cmc = 1,
	cost = '{3}{G}{G}',
	colors = {},
	attributes = {},
	imageUrl = 'https://img.scryfall.com/cards/png/front/8/c/8c604697-5c81-4329-9b16-f19bd90ba08c.png?1549415015',
}) => (
	<div className={card}>
		{name}
		<ManaCost cost={cost} />
	</div>
);

export default Card;
