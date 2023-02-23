import React from 'react';

import { AuthProvider } from '~/contexts/Auth/AuthProvider';
import { JobsProvider } from '~/contexts/Jobs/JobsProvider';

type GlobalContextProps = {
  children: React.ReactNode;
};

export const GlobalContext = ({ children }: GlobalContextProps) => {
  return (
    <AuthProvider>
      <JobsProvider>{children}</JobsProvider>
    </AuthProvider>
  );
};
