import React from 'react';

import { SignInFormData } from '~/@types/signIn';
import { SignUpFormData } from '~/@types/signUp';
import { User } from '~/@types/user';

type AuthContextData = {
  signIn: (credentials: SignInFormData) => Promise<void>;
  signUp: (credentials: SignUpFormData) => Promise<void>;
  logout: () => void;
  user: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = React.createContext({} as AuthContextData);
