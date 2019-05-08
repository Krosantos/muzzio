import React from 'react';
import Slider from '@components/Slider';
import AddCards from '@components/AddCards';
import ContextMenu from '@components/ContextMenu';
import DeckList from '@components/DeckList';
import SaveButton from '@components/Debug/SaveButton';
import Header from './Header';
import MainPanel from './MainPanel';

const Layout = () => (
	<>
		<Header />
		<Slider label="Deck" left>
			<DeckList />
		</Slider>
		<Slider label="Search">
			<AddCards />
		</Slider>
		<MainPanel />
		<SaveButton />
		<ContextMenu />
	</>
);

export default Layout;
