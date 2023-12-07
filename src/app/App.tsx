import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import './app.css'

import AppRouter from './routing/AppRouter.jsx'
import Header from '../widgets/Header/ui/Header'
import Footer from '../widgets/Footer/ui/Footer'

function App (): JSX.Element {
  return (
    <Router>
      <Header />
      <AppRouter />
      <Footer />
    </Router>
  )
}

export default App
