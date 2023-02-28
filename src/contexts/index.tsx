import React from 'react';

import { AuthProvider } from '~/contexts/Auth/AuthProvider';
import { CyclesProvider } from '~/contexts/Cycles/CyclesProvider';
import { JobsProvider } from '~/contexts/Jobs/JobsProvider';

type GlobalContextProps = {
  children: React.ReactNode;
};

export const GlobalContext = ({ children }: GlobalContextProps) => {
  return (
    <AuthProvider>
      <JobsProvider>
        <CyclesProvider>{children}</CyclesProvider>
      </JobsProvider>
    </AuthProvider>
  );
};
