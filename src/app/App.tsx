import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import AppRouter from './routing/AppRouter';

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
