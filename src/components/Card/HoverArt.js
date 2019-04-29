import React, { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import clamp from 'lodash/clamp';
import { imageContainer, image } from './styles.scss';

const IMAGE_WIDTH = 366;
const IMAGE_HEIGHT = 510;

// eslint-disable-next-line max-statements, complexity
const calculateOffset = (clientX, clientY, hasBackside) => {
	const TOTAL_HEIGHT = IMAGE_HEIGHT * (hasBackside ? 2 : 1);
	const TOTAL_WIDTH = IMAGE_WIDTH * (hasBackside ? 2 : 1);
	const result = {};

	let left;

	let top;

	if (clientX + IMAGE_WIDTH + 20 > window.innerWidth)
		left = clientX - 20 - TOTAL_WIDTH;
	else
		left = clientX + 20;

	if (clientY + IMAGE_HEIGHT + 20 > window.innerHeight)
		top = clientY - 20 - TOTAL_HEIGHT;
	else
		top = clientY + 20;

	result.left = `${clamp(left, 0, window.innerWidth - TOTAL_WIDTH)}px`;
	result.top = `${clamp(top, 0, window.innerHeight - TOTAL_HEIGHT)}px`;
	return result;
};

const HoverArt = ({ imageUrl, reverseUrl }) => {
	const [style, setMousePosition] = useState({ left: '0px', top: '0px' });
	const updatePosition = useCallback(
		throttle(({ clientX, clientY }) => {
			const offset = calculateOffset(clientX, clientY, !!reverseUrl);

			setMousePosition({ ...offset, visibility: 'visible' });
		}, 100),
	);

	useEffect(() => {
		window.addEventListener('mousemove', updatePosition);
		return () => {
			window.removeEventListener('mousemove', updatePosition);
		};
	});

	return (
		<div className={imageContainer} style={style}>
			<img alt="" className={image} src={imageUrl} />
			{reverseUrl && <img alt="" className={image} src={reverseUrl} />}
		</div>
	);
};

export default HoverArt;
