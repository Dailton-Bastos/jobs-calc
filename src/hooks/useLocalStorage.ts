import React from 'react';

import { persistentStorage } from '~/helpers/persistentStorage';

export function usePersistentStorageValue<T>(key: string, initialValue?: T) {
  const [value, setValue] = React.useState<T>(() => {
    const valueFromStorage = persistentStorage.getItem(key);

    const hasInitialValue =
      typeof initialValue === 'object' &&
      !Array.isArray(initialValue) &&
      initialValue !== null;

    if (hasInitialValue) {
      return {
        ...initialValue,
        ...valueFromStorage,
      };
    }

    return valueFromStorage || initialValue;
  });

  React.useEffect(() => {
    persistentStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
