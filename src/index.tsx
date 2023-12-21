import ReactDOM from 'react-dom/client'
import App from './app/App'
import React from 'react'
import ErrorBoundary from 'features/ErrorBoundary/ErrorBoundary'
window.React = React

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
