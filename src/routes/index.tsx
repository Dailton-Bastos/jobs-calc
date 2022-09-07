import { Routes, Route } from 'react-router-dom';

import { Auth } from '~/Layouts/Auth';
import { Home } from '~/pages/Home';
import { NewJobPage } from '~/pages/Jobs/New';
import { ProtectedRoute } from '~/routes/ProtectedRoute';

export const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Auth />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/jobs/new" element={<NewJobPage />} />
      </Route>
    </Routes>
  );
};
