import React from 'react';
import styled from 'styled-components';
import FormatHeader from '@components/FormatHeader';
import LandCount from '@components/LandCount';
import SampleHand from '@components/SampleHand';

const Header:React.FC = () => (
  <Wrapper>
    <FormatHeader />
    <RightSection>
      <LandCount />
      <SampleHand />
    </RightSection>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  height: 3em;
  flex-shrink: 0;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.smoke};
`;

const RightSection = styled.div`
  display: flex;
`;

export default Header;