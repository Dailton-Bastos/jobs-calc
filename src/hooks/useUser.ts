import React from 'react';

import {
  updateProfile as fbUpdateProfile,
  AuthError,
  User,
} from 'firebase/auth';

type Profile = {
  displayName?: string | null;
  photoURL?: string | null;
};

export type UpdateUserHook<M> = [M, AuthError | Error | undefined, boolean];
export type UpdateProfileHook = UpdateUserHook<
  (profile: Profile) => Promise<boolean>
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
