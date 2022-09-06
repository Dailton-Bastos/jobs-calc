import { Routes, Route } from 'react-router-dom';

import { Auth } from '~/Layouts/Auth';
import { Home } from '~/pages/Home';

export const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Auth />} />

      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
};
