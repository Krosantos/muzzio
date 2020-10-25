import React from 'react';
import FormatHeader from '@components/FormatHeader';
import LandCount from '@components/LandCount';
import SampleHand from '@components/SampleHand';
import { header, rightSection } from './styles.scss';

const Header = () => (
  <div className={header}>
    <FormatHeader />
    <div className={rightSection}>
      <LandCount />
      <SampleHand />
    </div>
  </div>
);

export default Header;
