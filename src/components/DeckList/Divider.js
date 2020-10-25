import React, { useMemo } from 'react';
import useFormat from '@hooks/useFormat';
import useCards from '@hooks/useCards';
import { divider } from './styles.scss';

const Divider = ({ label }) => {
  const { isSingleton } = useFormat();
  const { cardsInSideboard } = useCards();
  const shouldHideDivider = useMemo(() => {
    if (isSingleton)
      return true;
    const sideboardCards = cardsInSideboard();

    return sideboardCards.length <= 0;
  }, [cardsInSideboard, isSingleton]);

  if (shouldHideDivider)
    return null;
  return (
    <div className={divider}>
      {label}
    </div>
  );
};

export default Divider;
