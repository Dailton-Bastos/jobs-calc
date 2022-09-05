import React from 'react';

import { SignInFormData } from '~/@types/signIn';

type AuthContextData = {
  signIn: (credentials: SignInFormData) => Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextData);
