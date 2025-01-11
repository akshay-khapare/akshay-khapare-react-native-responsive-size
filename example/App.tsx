import React, { useEffect } from 'react';
import { cleanup } from '../src';
import ExampleComponent from './ExampleComponent';

const App = () => {
  useEffect(() => {
    // Cleanup function to remove dimension listeners when app unmounts
    return () => cleanup();
  }, []);

  return <ExampleComponent />;
};

export default App;
