import React from 'react';
import AttributeList from '@components/AttributeList';
import { mainPanel } from './styles.scss';

const MainPanel = () => (
	<div className={mainPanel}>
		<AttributeList />
	</div>
);

export default MainPanel;
