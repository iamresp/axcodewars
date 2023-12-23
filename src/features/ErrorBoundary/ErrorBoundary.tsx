import React, { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: string | number
}
class ErrorBoundary extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { error: '', hasError: false }
  }

  static getDerivedStateFromError (error: Error): State {
    // Update state so the next render will show the fallback UI.
    console.error(error, 'getDerivedStateFromError')

    return { error: error.message, hasError: true }
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service

    console.log(error, errorInfo)
  }

  render (): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong. Error: {this.state.error}
        </h1>)
    }

    return this.props.children
  }
}

export default ErrorBoundary
