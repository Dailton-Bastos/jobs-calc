import React from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type UseLockedBodyOutput = {
  locked: boolean;
  setLocked: (locked: boolean) => void;
};

export const useLockedBodyScroll = (
  initialLocked = false,
  rootId = 'root',
): UseLockedBodyOutput => {
  const [locked, setLocked] = React.useState(initialLocked);

  useIsomorphicLayoutEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';

    const root = document.getElementById(rootId);
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);

  React.useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return { locked, setLocked };
};
