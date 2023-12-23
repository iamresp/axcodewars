import React, { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from 'shared/components'
import cls from './styles.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: string
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
      return (
        <div className={cls.errorBoundary}>
          <h1 className={cls.title}>{this.state.error}</h1>
          {/* <h2 className={cls.code}>{this.state.error}</h2> */}
          <Button onClick={() => {
            window.location.reload()
          }} text='На главную' isOrange className={cls.redirectBtn}/>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
