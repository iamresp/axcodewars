import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRouter from './routing/AppRouter';
import './app.css';
import React from 'react';
import Header from '../widgets/Header/ui/Header';
import { Footer } from '../widgets/Footer/ui/Footer';

function App() {
  return (
    <Router>
      <Header />
      <AppRouter />
      <Footer />
    </Router>
  );
}

export default App;
