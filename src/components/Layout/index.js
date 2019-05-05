import React from 'react';
import Slider from '@components/Slider';
import AddCards from '@components/AddCards';
import Header from './Header';
import MainPanel from './MainPanel';

const Layout = () => (
	<>
		<Header />
		<Slider label="Deck" left />
		<Slider label="Search">
			<AddCards />
		</Slider>
		<MainPanel />
	</>
);

export default Layout;
