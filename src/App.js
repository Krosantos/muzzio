import React from 'react';
import Search from '@components/Search';
import Commander from '@components/Commander';
import List from '@components/List';
import { CardProvider } from '@contexts/Card';
import { CommanderProvider } from '@contexts/Commander';
import './index.css';

const App = () => (
	<CardProvider>
		<CommanderProvider>
			<Commander />
			<Search />
			<List />
		</CommanderProvider>
	</CardProvider>
);

export default App;
