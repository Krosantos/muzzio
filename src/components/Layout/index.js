import React from 'react';
import Slider from '@components/Slider';
import Header from './Header';
import MainPanel from './MainPanel';

const Layout = () => (
	<>
		<Header />
		<Slider label="Deck" left />
		<Slider label="Search" />
		<MainPanel />
	</>
);

export default Layout;
