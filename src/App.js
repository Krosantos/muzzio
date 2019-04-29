import React from 'react';
import Search from '@components/Search';
import Commander from '@components/Commander';
import { CommanderProvider } from '@contexts/Commander';
import './index.css';

const App = () => (
	<CommanderProvider>
		<Commander />
		<Search />
	</CommanderProvider>
);

export default App;
