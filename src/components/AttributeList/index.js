import React from 'react';
import useAttributes from '@hooks/useAttributes';
import Attribute from './Attribute';
import AddButton from './AddButton';
import { attributeList } from './styles.scss';

const AttributeList = () => {
	const { attributes } = useAttributes();

	return (
		<div className={attributeList}>
			{attributes.map((attribute) => <Attribute attribute={attribute} key={attribute} />)}
			<AddButton />
		</div>
	);
};

export default AttributeList;
