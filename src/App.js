import React from 'react';
import Layout from '@components/Layout';
import { CardProvider } from '@contexts/Card';
import { CardMenuProvider } from '@contexts/CardMenu';
import { CommanderProvider } from '@contexts/Commander';
import { OathbreakerProvider } from '@contexts/Oathbreaker';
import { AttributesProvider } from '@contexts/Attributes';
import { BasicLandProvider } from '@contexts/BasicLand';
import { FormatProvider } from '@contexts/Format';
import useAutoLoad from '@hooks/useAutoLoad';
import useAppMenu from '@hooks/useAppMenu';
import './index.scss';

/* eslint-disable react/jsx-max-depth */
const App = () => {
	const {
		attributes,
		basicLand,
		format,
		cards,
		commanderData,
		oathbreakerData,
	} = useAutoLoad();

	useAppMenu();

	return (
		<FormatProvider initialValue={format}>
			<CardProvider initialValue={cards}>
				<CommanderProvider initialValue={commanderData}>
					<OathbreakerProvider initialValue={oathbreakerData}>
						<AttributesProvider initialValue={attributes}>
							<BasicLandProvider initialValue={basicLand}>
								<CardMenuProvider>
									<Layout />
								</CardMenuProvider>
							</BasicLandProvider>
						</AttributesProvider>
					</OathbreakerProvider>
				</CommanderProvider>
			</CardProvider>
		</FormatProvider>
	);
};

export default App;
