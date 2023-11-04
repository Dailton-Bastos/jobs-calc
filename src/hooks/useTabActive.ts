import React from 'react';

export const useTabActive = () => {
  const [visibilityState, setVisibilityState] = React.useState(true);

  const handleVisibilityChange = React.useCallback(() => {
    setVisibilityState(document.visibilityState === 'visible');
  }, []);

  React.useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return { isTabActive: visibilityState };
};
