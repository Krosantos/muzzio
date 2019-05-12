import React from 'react';
import Commander from '@components/Commander';
import SaveAndLoad from '@components/SaveAndLoad';
import LandCount from '@components/LandCount';
import { header } from './styles.scss';

const Header = () => (
	<div className={header}>
		<Commander />
		<LandCount />
		<SaveAndLoad />
	</div>
);

export default Header;
