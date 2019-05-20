import React from 'react';
import useFormat from '@hooks/useFormat';
import Commander from './Commander';
import {
	// MODERN,
	COMMANDER,
	// OATHBREAKER,
	// STANDARD,
} from '@constants';

const componentMap = {
	[COMMANDER]: Commander,
};

const FormatHeader = () => {
	const { format } = useFormat();

	const Component = componentMap[format];

	return <Component />;
};

export default FormatHeader;
