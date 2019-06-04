import React from 'react';
import Slider from '@components/Slider';
import AddCards from '@components/AddCards';
import DeckList from '@components/DeckList';
import useAutoSave from '@hooks/useAutoSave';
import useAppMenu from '@hooks/useAppMenu';
import Header from './Header';
import MainPanel from './MainPanel';

const Layout = () => {
	useAppMenu();
	useAutoSave();
	return (
		<>
			<Header />
			<Slider label="Deck" left>
				<DeckList />
			</Slider>
			<MainPanel />
			<Slider label="Search">
				<AddCards />
			</Slider>
		</>
	);
};

export default Layout;
