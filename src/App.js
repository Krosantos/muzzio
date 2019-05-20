import React from 'react';
import Layout from '@components/Layout';
import { CardProvider } from '@contexts/Card';
import { CardMenuProvider } from '@contexts/CardMenu';
import { CommanderProvider } from '@contexts/Commander';
import { AttributesProvider } from '@contexts/Attributes';
import { BasicLandProvider } from '@contexts/BasicLand';
import { FormatProvider } from '@contexts/Format';
import useAutoLoad from '@hooks/useAutoLoad';
import './index.scss';

/* eslint-disable react/jsx-max-depth */
const App = () => {
	const {
		attributes,
		basicLand,
		format,
		cards,
		commanderData,
	} = useAutoLoad();

	return (
		<FormatProvider initialValue={format}>
			<CardProvider initialValue={cards}>
				<CommanderProvider initialValue={commanderData}>
					<AttributesProvider initialValue={attributes}>
						<BasicLandProvider initialValue={basicLand}>
							<CardMenuProvider>
								<Layout />
							</CardMenuProvider>
						</BasicLandProvider>
					</AttributesProvider>
				</CommanderProvider>
			</CardProvider>
		</FormatProvider>
	);
};

export default App;
