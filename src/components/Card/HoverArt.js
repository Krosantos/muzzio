import React, { useCallback, useEffect, useState } from 'react';
import { imageContainer, image } from './styles.scss';

const HoverArt = ({ imageUrl, reverseUrl }) => {
	const [style, setMousePosition] = useState({ left: '0px', top: '0px' });
	const updatePosition = useCallback(({ clientX, clientY }) => {
		const xPos = `${(clientX + 20)}px`;
		const yPos = `${(clientY + 20)}px`;

		setMousePosition({ left: xPos, top: yPos });
	});

	useEffect(() => {
		console.log(window);
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
