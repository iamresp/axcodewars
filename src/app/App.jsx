import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRouter from './routing/AppRouter';
import './app.css'
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

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
