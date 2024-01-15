import { BrowserRouter as Router } from 'react-router-dom'
import React, { type FC } from 'react'
import './app.css'

import { ThemeProvider } from './context/ThemeProvider'
import AppRouter from './routing/AppRouter'
import Header from '../widgets/Header/ui/Header'
import Footer from '../widgets/Footer/ui/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App: FC = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App
