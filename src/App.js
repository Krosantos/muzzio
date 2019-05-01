import React from 'react';
import Layout from '@components/Layout';
import Search from '@components/Search';
import { CardProvider } from '@contexts/Card';
import { CommanderProvider } from '@contexts/Commander';
import './index.css';

const App = () => (
	<CardProvider>
		<CommanderProvider>
			<Layout />
			<Search />
		</CommanderProvider>
	</CardProvider>
);

export default App;
