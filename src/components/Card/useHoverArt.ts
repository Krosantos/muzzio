import { useCallback, useState } from "react";

type UseHoverArt = () => {
  hideArt: () => void;
  shouldShowArt: boolean;
  showArt: () => void;
};

const useHoverArt: UseHoverArt = () => {
  const [shouldShowArt, setShowArt] = useState(false);
  const hideArt = useCallback(() => setShowArt(false), []);
  const showArt = useCallback(() => setShowArt(true), []);

  return { hideArt, shouldShowArt, showArt };
};

export default useHoverArt;
