import React from 'react';
import useFormat from '@hooks/useFormat';
import {
  COMMANDER,
  OATHBREAKER,
  LEGACY,
  MODERN,
  PAUPER,
  PIONEER,
  STANDARD,
  VINTAGE,
} from '@constants';
import Commander from './Commander';
import Oathbreaker from './Oathbreaker';
import Default from './Default';

const componentMap = {
  [COMMANDER]: Commander,
  [OATHBREAKER]: Oathbreaker,
  [LEGACY]:Default,
  [MODERN]:Default,
  [PAUPER]:Default,
  [PIONEER]:Default,
  [STANDARD]:Default,
  [VINTAGE]:Default,
};


const FormatHeader:React.FC = () => {
  const { format } = useFormat();
  const Component = componentMap[format];

  return <Component />;
};

export default FormatHeader;
