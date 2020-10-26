import React from 'react';
import styled from 'styled-components';
import ModalContainer from '@components/ModalContainer';
import CommanderSearch from './CommanderSearch';
import PartnerSearch from './PartnerSearch';

type ModalProps = {
  closeModal: ()=>void;
}
const Modal:React.FC<ModalProps> = ({  closeModal,}) => (
  <ModalContainer closeModal={closeModal}>
    <SearchContainer>
      <CommanderSearch closeModal={closeModal} />
      <PartnerSearch closeModal={closeModal} />
    </SearchContainer>
  </ModalContainer>
);

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 75vh;
  padding: 8px 0px 8px 8px;
`;

export default Modal;
