import React from 'react';
import Card from '../Card';

const CardList = ({ cards = [], callback = Function.prototype }) => cards.map((card) => (
	<Card
		key={card.id}
		callback={callback}
		card={card}
	/>
));

export default CardList;
