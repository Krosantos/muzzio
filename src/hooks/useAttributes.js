import { useContext, useCallback } from 'react';
import { AttributesContext } from '@contexts/Attributes';

const useCards = () => {
	const { attributes, setAttributes } = useContext(AttributesContext);

	const addAttribute = useCallback(((attribute) => {
		const toSet = [...attributes];

		toSet.push(attribute);
		return setAttributes(toSet);
	}), [attributes]);

	const removeAttribute = useCallback(((attribute) => {
		const toSet = attributes.filter((att) => att !== attribute);

		return setAttributes(toSet);
	}), [attributes]);

	return {
		addAttribute,
		attributes,
		removeAttribute,
	};
};

export default useCards;
