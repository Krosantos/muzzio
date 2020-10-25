import React, { useCallback } from 'react';
import useAttributes from '@hooks/useAttributes';
import { removeButton } from './styles.scss';

const X = 'X';

const RemoveButton = ({ attribute }) => {
  const { removeAttribute } = useAttributes();
  const handleClick = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    removeAttribute(attribute);
  }, [attribute, removeAttribute]);

  return (
    <button
      className={removeButton}
      onClick={handleClick}
      type="button"
    >
      {X}
    </button>
  );
};

export default RemoveButton;
