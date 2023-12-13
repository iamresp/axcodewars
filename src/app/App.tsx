import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import './app.css'

import AppRouter from './routing/AppRouter.jsx'
import Header from '../widgets/Header/ui/Header'
import Footer from '../widgets/Footer/ui/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <AppRouter />
      <Footer />
      <ToastContainer
        position='top-right'
        closeOnClick
        autoClose={3000}
        hideProgressBar
        draggable
        theme='light'
        limit={10}
      />
    </Router>
  )
}

export default App
