import React from 'react';

import { AuthProvider } from '~/contexts/Auth/AuthProvider';

type GlobalContextProps = {
  children: React.ReactNode;
};

export const GlobalContext = ({ children }: GlobalContextProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
