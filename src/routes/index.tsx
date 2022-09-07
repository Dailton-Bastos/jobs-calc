import { Routes, Route } from 'react-router-dom';

import { Loading } from '~/components/Loading';
import { useSpinner } from '~/hooks/useSpinner';
import { Auth } from '~/Layouts/Auth';
import { ForgotPassword } from '~/pages/Forgot';
import { Home } from '~/pages/Home';
import { NewJobPage } from '~/pages/Jobs/New';
import { SignIn } from '~/pages/SignIn';
import { SignUp } from '~/pages/Signup';
import { ProtectedRoute } from '~/routes/ProtectedRoute';

export const GlobalRoutes = () => {
  const { isLoading } = useSpinner();

  if (isLoading) return <Loading />;

  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/jobs/new" element={<NewJobPage />} />
      </Route>
    </Routes>
  );
};
