import { useContext, useCallback } from 'react';
import { CommanderContext } from '@contexts/Commander';
import { CardContext } from '@contexts/Card';
import { AttributesContext } from '@contexts/Attributes';
import { OathbreakerContext } from '@contexts/Oathbreaker';
import { FormatContext } from '@contexts/Format';
import {
  ALL_CARDS,
  OVERWRITE,
  COMMANDER,
} from '@constants';

const useOverwrite = () => {
  const { setAttributes } = useContext(AttributesContext);
  const { dispatch: cardsDispatch } = useContext(CardContext);
  const { setCommanderData } = useContext(CommanderContext);
  const { setOathbreakerData } = useContext(OathbreakerContext);
  const { setFormat } = useContext(FormatContext);

  const overwrite = useCallback((saveData = {}) => {
    const {
      attributes = [ALL_CARDS],
      cards = {},
      commanderData = {},
      format = COMMANDER,
      oathbreakerData = {},
    } = saveData;

    setFormat(format);
    setOathbreakerData(oathbreakerData);
    setAttributes(attributes);
    cardsDispatch({ card: cards, type: OVERWRITE });
    setCommanderData(commanderData);
  }, [cardsDispatch, setAttributes, setCommanderData, setFormat, setOathbreakerData]);

  return overwrite;
};

export default useOverwrite;
