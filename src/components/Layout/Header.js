import React from 'react';
import Commander from '@components/Commander';
import SaveAndLoad from '@components/SaveAndLoad';
import { header } from './styles.scss';

const Header = () => (
	<div className={header}>
		<Commander />
		<SaveAndLoad />
	</div>
);

export default Header;
