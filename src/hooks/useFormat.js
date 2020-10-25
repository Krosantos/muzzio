import { useContext, useMemo, useCallback } from 'react';
import { FormatContext } from '@contexts/Format';
import { formats, singletonFormats } from '@constants';

const useFormat = () => {
  const { format: innerFormat, setFormat: innerSet } = useContext(FormatContext);
  const setFormat = useCallback((formatToSet) => {
    if (formats.includes(formatToSet))
      innerSet(formatToSet);
  }, [innerSet]);
  const format = useMemo(() => innerFormat, [innerFormat]);
  const isSingleton = useMemo(() => singletonFormats.includes(innerFormat), [innerFormat]);

  return {
    format,
    isSingleton,
    setFormat,
  };
};

export default useFormat;
