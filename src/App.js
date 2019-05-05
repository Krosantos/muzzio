import React from 'react';
import Layout from '@components/Layout';
import { CardProvider } from '@contexts/Card';
import { CommanderProvider } from '@contexts/Commander';
import { AttributesProvider } from '@contexts/Attributes';
import './index.css';

/* eslint-disable react/jsx-max-depth */
const App = () => (
	<CardProvider>
		<CommanderProvider>
			<AttributesProvider>
				<Layout />
			</AttributesProvider>
		</CommanderProvider>
	</CardProvider>
);

export default App;
