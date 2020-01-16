import React from 'react';
import useFormat from '@hooks/useFormat';
import {
	COMMANDER,
	OATHBREAKER,
} from '@constants';
import Commander from './Commander';
import Oathbreaker from './Oathbreaker';
import Default from './Default';

const componentMap = {
	[COMMANDER]: Commander,
	[OATHBREAKER]: Oathbreaker,
};

const FormatHeader = () => {
	const { format } = useFormat();
	const Component = componentMap[format] || Default;

	return <Component />;
};

export default FormatHeader;
