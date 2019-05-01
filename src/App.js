import React from 'react';
import Layout from '@components/Layout';
import { CardProvider } from '@contexts/Card';
import { CommanderProvider } from '@contexts/Commander';
import './index.css';

const App = () => (
	<CardProvider>
		<CommanderProvider>
			<Layout />
		</CommanderProvider>
	</CardProvider>
);

export default App;
