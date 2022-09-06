import { Routes, Route } from 'react-router-dom';

import { Home } from '~/pages/Home';
import { SignIn } from '~/pages/SignIn';

export const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
};
