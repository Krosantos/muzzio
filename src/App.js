import React from 'react';
import Search from '@components/Search';
import Commander from '@components/Commander';
import { CommanderProvider } from '@contexts/CommanderContext';
import './index.css';

/*eslint-disable*/
const App = () => (
	<CommanderProvider>
		<div style={{ fontSize: '28px' }}>Ormendahl, Profane Prince</div>
		<img src="./mana/B.svg" style={{ height: '28px', width: '28px' }} />
		<img src="./mana/2R.svg" style={{ height: '28px', width: '28px' }} />
		<Search />
		<Commander />
	</CommanderProvider>
);

export default App;
