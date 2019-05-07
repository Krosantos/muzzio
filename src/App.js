import React from 'react';
import Layout from '@components/Layout';
import { CardProvider } from '@contexts/Card';
import { CardMenuProvider } from '@contexts/CardMenu';
import { CommanderProvider } from '@contexts/Commander';
import { AttributesProvider } from '@contexts/Attributes';
import './index.css';

/* eslint-disable react/jsx-max-depth */
const App = () => (
	<CardProvider>
		<CommanderProvider>
			<AttributesProvider>
				<CardMenuProvider>
					<Layout />
				</CardMenuProvider>
			</AttributesProvider>
		</CommanderProvider>
	</CardProvider>
);

export default App;
