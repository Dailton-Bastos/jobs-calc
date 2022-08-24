import { useState } from 'react';

import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';

import { ReactComponent as Logo } from './logo.svg';

import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" title="logo" />
        <Heading>Hello Vite + React!</Heading>
        <p>
          <button type="button" onClick={() => setCount((prev) => prev + 1)}>
            count is: {count}
          </button>

          <Button variant="secondary">Hello Vite + React!</Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export default App;
