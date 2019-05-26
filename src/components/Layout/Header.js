import React from 'react';
import FormatHeader from '@components/FormatHeader';
import LandCount from '@components/LandCount';
import { header } from './styles.scss';

const Header = () => (
	<div className={header}>
		<FormatHeader />
		<LandCount />
	</div>
);

export default Header;
