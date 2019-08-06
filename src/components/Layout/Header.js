import React from 'react';
import FormatHeader from '@components/FormatHeader';
import LandCount from '@components/LandCount';
import SampleHand from '@components/SampleHand';
import { header } from './styles.scss';

const Header = () => (
	<div className={header}>
		<FormatHeader />
		<SampleHand />
		<LandCount />
	</div>
);

export default Header;
