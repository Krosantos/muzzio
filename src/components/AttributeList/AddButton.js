import React, { useState, useCallback } from 'react';
import useAttributes from '@hooks/useAttributes';
import { attributeContainer, inputBox } from './styles.scss';

const AddButton = () => {
  const { attributes, addAttribute } = useAttributes();
  const [toAdd, setToAdd] = useState('');
  const updateValue = useCallback((event) => {
    setToAdd(event.target.value);
  }, []);
  const onEnter = useCallback(async ({ key }) => {
    if (key !== 'Enter' || attributes.includes(toAdd) || !toAdd)
      return;
    addAttribute(toAdd);
    setToAdd('');
  }, [attributes, toAdd, addAttribute]);

  return (
    <div className={attributeContainer}>
      <input
        className={inputBox}
        onChange={updateValue}
        onKeyPress={onEnter}
        placeholder="Add Attribute"
        value={toAdd}
      />
    </div>
  );
};

export default AddButton;
