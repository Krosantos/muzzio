import React from 'react';
import Layout from '@components/Layout';
import { CardProvider } from '@contexts/Card';
import { CardMenuProvider } from '@contexts/CardMenu';
import { CommanderProvider } from '@contexts/Commander';
import { AttributesProvider } from '@contexts/Attributes';
import useAutoLoad from '@hooks/useAutoLoad';
import './index.css';

/* eslint-disable react/jsx-max-depth */
const App = () => {
	const { attributes, cards, commanderData } = useAutoLoad();

	return (
		<CardProvider initialValue={cards}>
			<CommanderProvider initialValue={commanderData}>
				<AttributesProvider initialValue={attributes}>
					<CardMenuProvider>
						<Layout />
					</CardMenuProvider>
				</AttributesProvider>
			</CommanderProvider>
		</CardProvider>
	);
};

export default App;
