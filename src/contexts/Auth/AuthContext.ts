import React from 'react';

import { SignInFormData } from '~/@types/signIn';
import { User } from '~/@types/user';

type AuthContextData = {
  signIn: (credentials: SignInFormData) => Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = React.createContext({} as AuthContextData);
