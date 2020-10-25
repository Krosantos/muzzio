import React, { useCallback } from 'react';
import { underlay, modal } from './styles.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
const ModalContainer = ({ closeModal, children }) => {
  const trapClick = useCallback((event) => event.stopPropagation(), []);

  return (
    <div className={underlay} onClick={closeModal}>
      <div className={modal} onClick={trapClick}>
        {children}
      </div>
    </div>
  );
};
/* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

export default React.memo(ModalContainer);

