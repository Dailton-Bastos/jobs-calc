import React from 'react';

import {
  updateProfile as fbUpdateProfile,
  updatePassword as fbPpdatePassword,
  reauthenticateWithCredential as fbReauthenticateWithCredential,
  deleteUser as fbDeleteUser,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  EmailAuthProvider,
  AuthError,
  User,
} from 'firebase/auth';

import { auth } from '~/config/firebase';

type Profile = {
  displayName?: string | null;
  photoURL?: string | null;
};

export type UpdateUserHook<M> = [M, AuthError | Error | undefined, boolean];
export type UpdateProfileHook = UpdateUserHook<
  (profile: Profile) => Promise<boolean>
>;
export type UpdatePasswordHook = UpdateUserHook<
  (password: string) => Promise<boolean>
>;
export type ReuthenticateWithCredentialHook = UpdateUserHook<
  (password: string) => Promise<boolean>
>;
export type DeleteUserHook = UpdateUserHook<() => Promise<boolean>>;
export type SendPasswordResetEmailHook = UpdateUserHook<
  (email: string) => Promise<boolean>
>;

export const useUpdateProfile = (user: User | null): UpdateProfileHook => {
  const [error, setError] = React.useState<AuthError | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const updateProfile = React.useCallback(
    async (profile: Profile) => {
      if (!user) return false;

      setLoading(true);
      setError(undefined);

      try {
        await fbUpdateProfile(user, profile);

        return true;
      } catch (err) {
        setError(err as AuthError);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  return [updateProfile, error, loading];
};

export const useUpdatePassword = (user: User | null): UpdatePasswordHook => {
  const [error, setError] = React.useState<AuthError | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const updatePassword = React.useCallback(
    async (password: string) => {
      if (!user || !password) return false;

      setLoading(true);
      setError(undefined);

      try {
        await fbPpdatePassword(user, password);

        return true;
      } catch (err) {
        setError(err as AuthError);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  return [updatePassword, error, loading];
};

export const useReuthenticateWithCredential = (
  user: User | null,
): ReuthenticateWithCredentialHook => {
  const [error, setError] = React.useState<AuthError | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const reauthenticateWithCredential = React.useCallback(
    async (password: string) => {
      if (!(user?.email && password)) return false;

      setLoading(true);
      setError(undefined);

      const credential = EmailAuthProvider.credential(user?.email, password);

      try {
        await fbReauthenticateWithCredential(user, credential);

        return true;
      } catch (err) {
        setError(err as AuthError);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  return [reauthenticateWithCredential, error, loading];
};

export const useDeteleUser = (user: User | null): DeleteUserHook => {
  const [error, setError] = React.useState<AuthError | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const deleteUser = React.useCallback(async () => {
    if (!user) return false;

    setLoading(true);
    setError(undefined);

    try {
      await fbDeleteUser(user);

      return true;
    } catch (err) {
      setError(err as AuthError);

      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return [deleteUser, error, loading];
};

export const useResetPassword = (): SendPasswordResetEmailHook => {
  const [error, setError] = React.useState<AuthError | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const resetPassword = React.useCallback(async (email: string) => {
    if (!email) return false;

    try {
      await fbSendPasswordResetEmail(auth, email);
      return true;
    } catch (err) {
      setError(err as AuthError);

      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return [resetPassword, error, loading];
};
