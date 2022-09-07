import React from 'react';

export const useSpinner = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return { isLoading };
};
