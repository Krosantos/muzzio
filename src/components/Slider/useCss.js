import { useMemo } from 'react';
import {
  slider,
  sliderRight,
  retractedLeft,
  retractedRight,
  tabOuter,
  tabLeft,
  tabRight,
} from './styles.scss';

const calculateSliderStyle = (isOpen, left) => {
  const base = left ? `${slider}` : `${slider} ${sliderRight}`;

  if (isOpen)
    return base;
  return left ? `${base} ${retractedLeft}` : `${base} ${retractedRight}`;
};

const useSliderStyle = (isOpen, left) => {
  const result = useMemo(() => calculateSliderStyle(isOpen, left), [isOpen, left]);

  return result;
};

const useTabStyle = (left) => {
  const tabStyle = useMemo(() => {
    const direction = left ? tabLeft : tabRight;

    return `${tabOuter} ${direction}`;
  }, [left]);

  return tabStyle;
};

export {
  useSliderStyle,
  useTabStyle,
};
