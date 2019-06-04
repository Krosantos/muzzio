import React from 'react';
import Layout from '@components/Layout';
import { CardProvider } from '@contexts/Card';
import { CardMenuProvider } from '@contexts/CardMenu';
import { CommanderProvider } from '@contexts/Commander';
import { OathbreakerProvider } from '@contexts/Oathbreaker';
import { AttributesProvider } from '@contexts/Attributes';
import { FormatProvider } from '@contexts/Format';
import useAutoLoad from '@hooks/useAutoLoad';
import './index.scss';

/* eslint-disable react/jsx-max-depth */
const App = () => {
	const {
		attributes,
		format,
		cards,
		commanderData,
		oathbreakerData,
	} = useAutoLoad();

	return (
		<FormatProvider initialValue={format}>
			<CardProvider initialValue={cards}>
				<CommanderProvider initialValue={commanderData}>
					<OathbreakerProvider initialValue={oathbreakerData}>
						<AttributesProvider initialValue={attributes}>
							<CardMenuProvider>
								<Layout />
							</CardMenuProvider>
						</AttributesProvider>
					</OathbreakerProvider>
				</CommanderProvider>
			</CardProvider>
		</FormatProvider>
	);
};

export default App;
