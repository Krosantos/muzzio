import { useContext, useMemo, useCallback } from "react";
import { FormatContext } from "@contexts/Format";
import { formats, singletonFormats } from "@constants";
import type { Format } from "@contexts/Format";

type UseFormat = () => {
  format: Format;
  isSingleton: boolean;
  setFormat: (format: Format) => void;
};
const useFormat: UseFormat = () => {
  const { format: innerFormat, setFormat: innerSet } = useContext(FormatContext);
  const setFormat = useCallback(
    (formatToSet: Format) => {
      if (formats[formatToSet]) innerSet(formatToSet);
    },
    [innerSet],
  );
  const format = useMemo(() => innerFormat, [innerFormat]);
  const isSingleton = useMemo(() => singletonFormats.includes(innerFormat), [
    innerFormat,
  ]);

  return {
    format,
    isSingleton,
    setFormat,
  };
};

export default useFormat;
