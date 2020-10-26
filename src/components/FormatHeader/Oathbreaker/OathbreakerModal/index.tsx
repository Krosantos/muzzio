import React from 'react';
import styled from 'styled-components';
import ModalContainer from '@components/ModalContainer';
import OathbreakerSearch from './OathbreakerSearch';
import SignatureSearch from './SignatureSearch';

type ModalProps = {
  closeModal:()=>void;
}
const Modal:React.FC<ModalProps> = ({ closeModal }) => (
  <ModalContainer closeModal={closeModal}>
    <SearchContainer>
      <OathbreakerSearch />
      <SignatureSearch closeModal={closeModal} />
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
