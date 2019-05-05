import React, { useCallback, useState } from 'react';
import SliderButton from './SliderButton';
import { useSliderStyle, useTabStyle } from './useCss';

const Slider = ({ children, label, left }) => {
	const [isOpen, setOpen] = useState(false);
	const toggleSlider = useCallback((event) => {
		event.stopPropagation();
		event.preventDefault();
		setOpen(!isOpen);
	}, [isOpen]);

	const sliderClass = useSliderStyle(isOpen, left);
	const tabClass = useTabStyle(left);

	return (
		<div className={sliderClass}>
			<div className={tabClass}>
				{children}
				<SliderButton handleClick={toggleSlider} label={label} />
			</div>
		</div>
	);
};

export default Slider;
