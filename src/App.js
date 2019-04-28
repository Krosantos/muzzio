import React from 'react';
import Search from '@components/Search';
import Card from '@components/Card';
import Commander from '@components/Commander';
import { CommanderProvider } from '@contexts/CommanderContext';
import './index.css';

const App = () => (
	<CommanderProvider>
		<Search />
		<Commander />
		<Card />
	</CommanderProvider>
);

export default App;
