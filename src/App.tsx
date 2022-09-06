import { BrowserRouter } from 'react-router-dom';

import { GlobalContext } from '~/contexts';
import { GlobalRoutes } from '~/routes';

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalContext>
        <GlobalRoutes />
      </GlobalContext>
    </BrowserRouter>
  );
};
