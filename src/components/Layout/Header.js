import React from 'react';
import Commander from '@components/Commander';
import { header } from './styles.scss';

const Header = () => (
	<div className={header}>
		<Commander />
	</div>
);

export default Header;
