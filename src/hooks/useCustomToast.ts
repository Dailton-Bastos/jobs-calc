import React from 'react';

import { useToast } from '@chakra-ui/react';
import type { UseToastOptions } from '@chakra-ui/react';

export const useCustomToast = () => {
  const toast = useToast();

  const customToast = React.useCallback(
    (options: UseToastOptions) => {
      const id = 'customToast';

      if (!toast.isActive(id)) {
        return toast({
          variant: 'left-accent',
          position: 'bottom-left',
          isClosable: true,
          ...options,
        });
      }
    },
    [toast],
  );

  return { customToast };
};
