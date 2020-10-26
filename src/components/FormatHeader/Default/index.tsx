import React, { useMemo } from 'react';
import styled from 'styled-components'
import capitalize from 'lodash/capitalize';
import useFormat from '@hooks/useFormat';
import useCards from '@hooks/useCards';
import ManaCost from '@components/ManaCost';
import CardCount from './CardCount';

type ConvertIdentityToCost = (identity:string[])=>string;
const convertIdentityToCost:ConvertIdentityToCost = (identity) => {
  if (identity.length === 0)
    return '{C}';
  return `{${identity.join('}{')}}`;
};

type GetIdentityFromCards = (cardsInDeck: Card[])=>string
const getIdentityFromCards:GetIdentityFromCards = (cardsInDeck = []) => {
  const identityMap:{[color:string]:boolean} = {};

  cardsInDeck.forEach((card) => {
    const { identity = [] } = card;

    identity.forEach((color) => {
      identityMap[color] = true;
    });
  });
  const identity = Object.keys(identityMap);

  return convertIdentityToCost(identity);
};

const DefaultFormat:React.FC = () => {
  const { format } = useFormat();
  const formattedFormat = useMemo(() => capitalize(format), [format]);
  const { cardsInDeck } = useCards();
  const deckIdentity = useMemo(() => getIdentityFromCards(cardsInDeck()),
    [cardsInDeck]);

  return (
    <Container >
      <FormatName >
        {formattedFormat}
      </FormatName>
      <CardCount />
      <Cost >
        <ManaCost cost={deckIdentity} />
      </Cost>

    </Container>
  );
};

const Container = styled.div`
  width: 40%;
  border-right: 1px solid ${({theme})=>theme.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FormatName = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  width: 250px;
  > * {
      height:50%;
  }
`;
const Cost = styled.div`
  margin: 0 8px;
  width: 102px;
  display: flex;
  justify-content: center;
`;

export default DefaultFormat;

