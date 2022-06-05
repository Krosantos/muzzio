import { useMemo } from "react";
import useFormat from "@hooks/useFormat";

type CountAppendUtil = (count: number, name: string) => string;

const getMaindeckCount: CountAppendUtil = (count, name) => {
  if (count > 0) return `${count} ${name}`;
  return name;
};

const getSideboardCount: CountAppendUtil = (sideboardCount, name) => {
  if (sideboardCount > 0) return `${sideboardCount} ${name}`;
  return name;
};

const getSingletonCount: CountAppendUtil = (count, name) => {
  if (count > 1) return `${count} ${name}`;
  return name;
};

type UseNameAndCount = (
  card: Card,
  useMaindeckCount: boolean,
  useSideboardCount: boolean,
) => string;

const useNameAndCount: UseNameAndCount = (card, useMaindeckCount, useSideboardCount) => {
  const { count, name, sideboardCount } = card;
  const { isSingleton } = useFormat();

  const nameAndCount = useMemo(() => {
    if (isSingleton) return getSingletonCount(count, name);
    if (useMaindeckCount) return getMaindeckCount(count, name);
    if (useSideboardCount) return getSideboardCount(sideboardCount, name);

    const inDeck = count > 0;
    const inSideboard = sideboardCount > 0;

    if (inDeck && inSideboard) return `${count} - (${sideboardCount}) ${name}`;
    if (inDeck) return `${count} ${name}`;
    if (inSideboard) return `(${sideboardCount}) ${name}`;
    return name;
  }, [count, isSingleton, name, sideboardCount, useMaindeckCount, useSideboardCount]);

  return nameAndCount;
};

export default useNameAndCount;
