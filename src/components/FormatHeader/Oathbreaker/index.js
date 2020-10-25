/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import useOathbreaker from '@hooks/useOathbreaker';
import ManaCost from '@components/ManaCost';
import SingletonCount from '../SingletonCount';
import OathbreakerModal from './OathbreakerModal';
import {
  container,
  oathbreakerName,
  manaCost,
} from './styles.scss';

const SELECT_OATHBREAKER_TEXT = 'Select Oathbreaker';
const SELECT_SIGNATURE_TEXT = 'Select Signature Spell';

const convertIdentityToCost = (identity) => {
  if (identity.length === 0)
    return '{C}';
  return `{${identity.join('}{')}}`;
};
// eslint-disable-next-line max-statements, max-lines-per-function, complexity
const Oathbreaker = () => {
  const [isOathbreakerModalOpen, setOathbreakerModalOpen] = useState(false);
  const closeOathbreakerModal = useCallback(() => setOathbreakerModalOpen(false), []);
  const openOathbreakerModal = useCallback(() => setOathbreakerModalOpen(true), []);
  const {
    colorIdentity,
    oathbreaker = {},
    signatureSpell = {},
  } = useOathbreaker();

  const identityAsCost = useMemo(() => convertIdentityToCost(colorIdentity), [colorIdentity]);

  return (
    <div className={container}>
      <div className={oathbreakerName} onClick={openOathbreakerModal}>
        <span>
          {oathbreaker.name || SELECT_OATHBREAKER_TEXT}
        </span>
        <span>
          {signatureSpell.name || SELECT_SIGNATURE_TEXT}
        </span>
      </div>
      <SingletonCount />
      <div className={manaCost}>
        <ManaCost className={manaCost} cost={identityAsCost} />
      </div>
      {isOathbreakerModalOpen
        && ReactDOM.createPortal(
          <OathbreakerModal
            closeModal={closeOathbreakerModal}
          />,
          document.querySelector('body'),
        )}
    </div>
  );
};

export default Oathbreaker;

