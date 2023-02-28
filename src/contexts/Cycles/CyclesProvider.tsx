import React from 'react';

import { CyclesProviderProps } from '~/@types/cycles';

import { CyclesContext } from './CyclesContext';

export const CyclesProvider = ({ children }: CyclesProviderProps) => {
  return <CyclesContext.Provider value={{}}>{children}</CyclesContext.Provider>;
};
