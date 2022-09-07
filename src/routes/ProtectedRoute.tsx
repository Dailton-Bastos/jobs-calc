import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} state={{ from: location }} />
  );
};
