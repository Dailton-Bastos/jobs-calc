import React from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { SignInFormData } from '~/@types/signIn';
import { User } from '~/@types/user';
import { auth, onAuthStateChanged } from '~/config/firebase';
import { AuthContext } from '~/contexts/Auth/AuthContext';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);

  const isAuthenticated = !!user;

  const signIn = React.useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        if (userCredential) {
          setUser(userCredential?.user);
        }
      } catch (error) {
        throw new Error('Failed to sign in user');
      }
    },
    [],
  );

  const contextValue = React.useMemo(
    () => ({
      signIn,
      user,
      isAuthenticated,
    }),
    [signIn, user, isAuthenticated],
  );

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
