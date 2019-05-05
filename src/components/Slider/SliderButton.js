import React from 'react';
import { tabInner } from './styles.scss';

const SliderButton = ({ label, handleClick }) => (
	<button
		className={tabInner}
		onClick={handleClick}
		type="button"
	>
		{label}
	</button>
);

export default SliderButton;
