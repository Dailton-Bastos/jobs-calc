import React from 'react';

import { AuthContext } from '~/contexts/Auth/AuthContext';

export const useAuth = () => React.useContext(AuthContext);
