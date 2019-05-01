import React, { useContext } from 'react';
import { CardContext } from '@contexts/Card';
import Commander from '@components/Commander';
import { header } from './styles.scss';

const Header = () => {
	const { cards } = useContext(CardContext);
	const count = Object.keys(cards).length;

	return (
		<div className={header}>
			<Commander />
			{count}
		</div>
	);
};

export default Header;
