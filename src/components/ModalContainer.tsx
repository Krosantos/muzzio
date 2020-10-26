import React, { useCallback } from 'react';
import styled from 'styled-components';

type ModalContainerProps = React.PropsWithChildren<{
  closeModal:()=>void;
}>
/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
const ModalContainer:React.FC<ModalContainerProps> = ({ closeModal, children }) => {
  const trapClick = useCallback((event) => event.stopPropagation(), []);

  return (
    <Underlay onClick={closeModal}>
      <Modal onClick={trapClick}>
        {children}
      </Modal>
    </Underlay>
  );
};
/* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

const Underlay = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.smoke};
  opacity: 55%;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  background-color: ${({ theme }) => theme.pale};
`;

export default React.memo(ModalContainer);

