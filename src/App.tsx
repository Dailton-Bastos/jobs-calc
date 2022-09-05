import { GlobalContext } from '~/contexts';
import { SignIn } from '~/pages/SignIn';

export const App = () => {
  return (
    <GlobalContext>
      <SignIn />
    </GlobalContext>
  );
};
