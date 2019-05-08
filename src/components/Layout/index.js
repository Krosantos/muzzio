import React from 'react';
import Slider from '@components/Slider';
import AddCards from '@components/AddCards';
import ContextMenu from '@components/ContextMenu';
import DeckList from '@components/DeckList';
import useAutoSave from '@hooks/useAutoSave';
import Header from './Header';
import MainPanel from './MainPanel';

const Layout = () => {
	useAutoSave();
	return (
		<>
			<Header />
			<Slider label="Deck" left>
				<DeckList />
			</Slider>
			<Slider label="Search">
				<AddCards />
			</Slider>
			<MainPanel />
			<ContextMenu />
		</>
	);
};

export default Layout;
