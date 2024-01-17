import ReactDOM from 'react-dom/client'
import App from './app/App'
import React from 'react'
import ErrorBoundary from 'features/ErrorBoundary/ErrorBoundary'
window.React = React

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
