import React from 'react';
import useFormat from '@hooks/useFormat';
import Commander from './Commander';
import Oathbreaker from './Oathbreaker';
import Default from './Default';
import {
	COMMANDER,
	OATHBREAKER,
} from '@constants';

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
