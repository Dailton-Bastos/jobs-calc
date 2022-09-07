import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { SignInFormData } from '~/@types/signIn';
import { SignUpFormData } from '~/@types/signUp';
import { User } from '~/@types/user';
import { auth, onAuthStateChanged } from '~/config/firebase';
import { AuthContext } from '~/contexts/Auth/AuthContext';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);

  const isAuthenticated = !!user;

  const navigate = useNavigate();

  const signIn = React.useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);

        navigate('/dashboard');
      } catch (error) {
        throw new Error('Failed to sign in user');
      }
    },
    [navigate],
  );

  const logout = React.useCallback(async () => {
    await signOut(auth);

    navigate('/', { replace: true });
  }, [navigate]);

  const signUp = React.useCallback(
    async ({ email, password, displayName }: SignUpFormData) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        if (userCredential) {
          await updateProfile(userCredential.user, {
            displayName,
          });

          const { currentUser } = auth;

          if (currentUser) {
            setUser({ ...currentUser, displayName });
            navigate('/dashboard');
          }
        }
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
    [navigate],
  );

  const contextValue = React.useMemo(
    () => ({
      signIn,
      user,
      isAuthenticated,
      logout,
      signUp,
    }),
    [signIn, user, isAuthenticated, logout, signUp],
  );

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
