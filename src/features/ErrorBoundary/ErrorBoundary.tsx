import React, { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from 'shared/components'
import cls from './styles.module.css'

/**
 * Компонент-ограничитель ошибок для перехвата JavaScript ошибок в любом компоненте потомке
 * и отображения резервного UI вместо "сломанного" компонента. Предотвращает крах всего приложения
 * и позволяет обрабатывать ошибки более правильно.
 *
 * @param {Object} props Свойства компонента.
 * @param {ReactNode} props.children Дочерние компоненты, которые ErrorBoundary будет оборачивать.
 */

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

  /**
   * Создает новое состояние компонента при перехвате ошибки.
   *
   * @param {Error} error Перехваченная ошибка.
   * @return {State} Новое состояние компонента.
   */
  static getDerivedStateFromError (error: Error): State {
    console.error(error, 'getDerivedStateFromError')

    return { error: error.message, hasError: true }
  }

  /**
   * Логирует информацию об ошибке и дополнительные сведения.
   *
   * @param {Error} error Перехваченная ошибка.
   * @param {ErrorInfo} errorInfo Информация о месте возникновения ошибки.
   */
  componentDidCatch (error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo)
  }

  render (): ReactNode {
    if (this.state.hasError) {
      // Резервный UI в случае возникновения ошибки
      return (
        <div className={cls.errorBoundary}>
          <h1 className={cls.title}>{this.state.error}</h1>
          <Button onClick={() => {
            window.location.reload()
          }} text='Перезагрузить страницу'
          isOrange className={cls.redirectBtn}/>
        </div>
      )
    }

    // Рендеринг дочерних компонентов, если ошибки нет
    return this.props.children
  }
}

export default ErrorBoundary
