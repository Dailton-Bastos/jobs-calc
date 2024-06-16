import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  ref,
  get,
  query,
  child,
  orderByChild,
  equalTo,
} from 'firebase/database';

import { SignInFormData } from '~/@types/signIn';
import { SignUpFormData } from '~/@types/signUp';
import { User } from '~/@types/user';
import { auth, onAuthStateChanged, db } from '~/config/firebase';
import { AuthContext } from '~/contexts/Auth/AuthContext';

type AuthProviderProps = {
  children: React.ReactNode;
};

type propState = {
  from: { pathname: string };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [jobber, setJobber] = React.useState<null | {
    accessToken: string;
    internalId: string;
  }>(null);

  const isAuthenticated = !!user;

  const userEmailVerified = user?.emailVerified ?? false;

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.state as propState;

  const origin = path?.from?.pathname || '/dashboard';

  const signIn = React.useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);

        navigate(origin);
      } catch (error) {
        throw new Error('Failed to sign in user');
      }
    },
    [navigate, origin],
  );

  const logout = React.useCallback(async () => {
    await signOut(auth);

    navigate('/', { replace: true });
  }, [navigate]);

  const signUp = React.useCallback(
    async ({ email, password }: SignUpFormData) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        navigate('/dashboard');
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
    [navigate],
  );

  const getUserJobberInfo = React.useCallback(async () => {
    if (!user) return;

    try {
      const snapshot = await get(
        query(
          child(ref(db), 'jobber'),
          orderByChild('userId'),
          equalTo(user.uid),
        ),
      );

      if (snapshot && snapshot.exists()) {
        const { accessToken, internalId } = Object.values<{
          accessToken: string;
          internalId: string;
        }>(snapshot.val())[0];

        setJobber({ accessToken, internalId });
        return;
      }
    } catch {
      throw new Error('Error to get user jobber info');
    }
  }, [user]);

  const updateJobberInfo = React.useCallback(
    (
      data: null | {
        accessToken: string;
        internalId: string;
      },
    ) => {
      setJobber(data);
    },
    [],
  );

  const contextValue = React.useMemo(
    () => ({
      signIn,
      user,
      isAuthenticated,
      logout,
      signUp,
      userEmailVerified,
      jobber,
      updateJobberInfo,
    }),
    [
      signIn,
      user,
      isAuthenticated,
      logout,
      signUp,
      userEmailVerified,
      jobber,
      updateJobberInfo,
    ],
  );

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    getUserJobberInfo();
  }, [getUserJobberInfo]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
