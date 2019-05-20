import React from 'react';
import FormatHeader from '@components/FormatHeader';
import SaveAndLoad from '@components/SaveAndLoad';
import LandCount from '@components/LandCount';
import { header } from './styles.scss';

const Header = () => (
	<div className={header}>
		<FormatHeader />
		<LandCount />
		<SaveAndLoad />
	</div>
);

export default Header;
