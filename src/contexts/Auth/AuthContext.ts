import React from 'react';

import { SignInFormData } from '~/@types/signIn';
import { SignUpFormData } from '~/@types/signUp';
import { User } from '~/@types/user';

type Jobber = {
  accessToken: string;
  internalId: string;
};

type AuthContextData = {
  signIn: (credentials: SignInFormData) => Promise<void>;
  signUp: (credentials: SignUpFormData) => Promise<void>;
  logout: () => void;
  user: User | null;
  isAuthenticated: boolean;
  userEmailVerified: boolean;
  jobber: null | Jobber;
  updateJobberInfo: (data: null | Jobber) => void;
};

export const AuthContext = React.createContext({} as AuthContextData);
