import React from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { SignInFormData } from '~/@types/signIn';
import { auth } from '~/config/firebase';
import { AuthContext } from '~/contexts/Auth/AuthContext';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const signIn = React.useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        return;
        userCredential;
      } catch (error) {
        throw new Error('Failed to sign in user');
      }
    },
    [],
  );

  const contextValue = React.useMemo(
    () => ({
      signIn,
    }),
    [signIn],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
