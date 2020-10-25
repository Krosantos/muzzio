import { useContext, useCallback } from 'react';
import { AttributesContext } from '@contexts/Attributes';

type UseAttributes = () => {
  addAttribute: (attribute: string) => void;
  attributes: string[];
  removeAttribute: (attribute: string) => void;
}
const useAttributes:UseAttributes = () => {
  const { attributes, setAttributes } = useContext(AttributesContext);

  const addAttribute = useCallback(((attribute) => {
    const toSet = [...attributes];

    toSet.push(attribute);
    return setAttributes(toSet);
  }), [attributes, setAttributes]);

  const removeAttribute = useCallback(((attribute) => {
    const toSet = attributes.filter((att) => att !== attribute);

    return setAttributes(toSet);
  }), [attributes, setAttributes]);

  return {
    addAttribute,
    attributes,
    removeAttribute,
  };
};

export default useAttributes;
