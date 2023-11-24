import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRouter from './routing/AppRouter';
import React from 'react';

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
