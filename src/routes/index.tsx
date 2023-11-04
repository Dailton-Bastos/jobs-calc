import { Routes, Route } from 'react-router-dom';

import { Loading } from '~/components/Loading';
import { useSpinner } from '~/hooks/useSpinner';
import { Auth } from '~/Layouts/Auth';
import { WithSidebar } from '~/Layouts/WithSidebar';
import { ForgotPassword } from '~/pages/Forgot';
import { Home } from '~/pages/Home';
import { AllJobsPage } from '~/pages/Jobs/All';
import { DetailsJobPage } from '~/pages/Jobs/Details';
import { EditJobPage } from '~/pages/Jobs/Edit';
import { EditJobReports } from '~/pages/Jobs/Edit/Reports';
import { NewJobPage } from '~/pages/Jobs/New';
import { Profile } from '~/pages/Profile';
import { ReportsPage } from '~/pages/Reports';
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
        <Route element={<WithSidebar />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/jobs" element={<AllJobsPage />} />
          <Route path="/jobs/reports" element={<ReportsPage />} />
        </Route>

        <Route path="/jobs/:id" element={<DetailsJobPage />} />
        <Route path="/jobs/new" element={<NewJobPage />} />
        <Route path="/jobs/:id/edit" element={<EditJobPage />} />
        <Route path="/jobs/:id/cycles" element={<EditJobReports />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
