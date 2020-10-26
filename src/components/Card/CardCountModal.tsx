/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import ModalContainer from '@components/ModalContainer';

type CardCountModalProps = {
  card:Card;
  setCountCallback:(otherCard:Card, count:number)=>void;
  closeModal:()=>void;
}
const CardCountModal:React.FC<CardCountModalProps> = ({ card, setCountCallback, closeModal }) => {
  const [internalCount, setInternalCount] = useState('');
  const updateInternalCount = useCallback((event) => {
    event.preventDefault();
    const count = event.target.value;

    setInternalCount(count);
  }, []);
  const wrappedKeyDown = useCallback((event) => {
    event.preventDefault();
    const count = parseInt(internalCount, 10);

    setCountCallback(card, count);
    closeModal();
  }, [card, closeModal, internalCount, setCountCallback]);

  return (
    <ModalContainer closeModal={closeModal}>
      <Form onSubmit={wrappedKeyDown}>
        <input
          autoFocus
          onChange={updateInternalCount}
          type="number"
          value={internalCount}
        />
        <span>{card.name}</span>
      </Form>
    </ModalContainer>
  );
};

const Form = styled.form`
  padding: 8px;
  & input{
      background-color: $white;
      border: none;
      padding: 0 4px;
      margin-right: 4px;
      height: 1.5em;
      width: 2.5em;
      outline: none;
      font-family: "Bitter", sans-serif
  }
`;

export default CardCountModal;
