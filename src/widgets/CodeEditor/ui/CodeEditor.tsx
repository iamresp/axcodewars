import React, {
  useState,
  useEffect,
  useContext,
  type FC,
  type MutableRefObject
} from 'react'
import { TimerCustom } from 'features/TimerCustom'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { darcula } from '@uiw/codemirror-theme-darcula'
import { duotoneLight } from '@uiw/codemirror-theme-duotone'
import { ThemeContext } from 'app/context/ThemeContext'
import cls from './CodeEditor.module.css'
import classNames from 'classnames'

interface CodeEditorProps {
  socket: MutableRefObject<WebSocket | null | undefined>
  rightResult: string
  attempts: number
  opponentCode: string
  opponentAttempts: number
  onAttempt: () => Promise<void>
  onWin: () => Promise<void>
  isTimeOutLose: () => void
}

const taskTime = 10000

export const CodeEditor: FC<CodeEditorProps> = ({
  socket,
  rightResult,
  attempts,
  opponentCode,
  opponentAttempts,
  onAttempt,
  onWin,
  isTimeOutLose
}) => {
  const [isReady, setIsReady] = useState(false)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [timer, setTimer] = useState(false)
  const { currentTheme } = useContext(ThemeContext)

  const sendCode = (value: string): void => {
    setCode(value)
    const message = {
      event: 'push',
      data: value
    }
    socket?.current?.send(JSON.stringify(message))
  }

  const handleValidateCode = async (timeout = false): Promise<void> => {
    let result = null

    try {
      result = eval(code)
    } catch (e) {
      throw new Error()
    }

    await onAttempt()

    if (result !== null && result !== code) {
      if ((result ?? '').toString() === rightResult) {
        await onWin()
        setMessage('Результат выполнения совпал с ответом')
      } else {
        if (timeout) {
          isTimeOutLose()

          return
        }
        setMessage('Результат выполнения не совпал с ответом')
      }
    } else {
      if (timeout) {
        isTimeOutLose()

        return
      }
      setMessage('Ошибка в коде')
    }
  }

  useEffect(() => {
    if (timer) {
      void handleValidateCode(timer)
    }
  }, [timer])

  return (
    <>
      {isReady
        ? (
          <TimerCustom ms={taskTime} setTime={setTimer} />
        )
        : (
          <button
            className={classNames(cls.mainButton, cls.readyButton)}
            type='button'
            onClick={() => {
              setIsReady(true)
            }}
          >
          Готов
          </button>
        )}
      <div className={cls.codeEditorsContainer}>
        <div className={cls.codeEditorContainer}>
          {isReady && <p className={cls.attempts}>Ваши попытки: {attempts}</p>}
          <CodeMirror
            value={code}
            className={cls.codeEditor}
            theme={currentTheme === 'light' ? duotoneLight : darcula}
            height='100%'
            extensions={[javascript({ jsx: true })]}
            onChange={sendCode}
          />
          <div className={cls.submitContainer}>
            {message.length > 0 && <div className={cls.alarm}>{message}</div>}
            {isReady && (
              <button
                className={classNames(cls.mainButton, cls.submitButton)}
                type='button'
                onClick={() => {
                  void handleValidateCode()
                }}
              >
                Отправить
              </button>
            )}
          </div>
        </div>
        <div className={cls.codeEditorContainer}>
          {isReady && (
            <p className={cls.attempts}>
              Попытки противника: {opponentAttempts}
            </p>
          )}
          <CodeMirror
            value={opponentCode}
            className={cls.codeEditor}
            height='100%'
            editable={false}
            theme={currentTheme === 'light' ? duotoneLight : darcula}
            extensions={[javascript({ jsx: true })]}
          />
        </div>
      </div>
    </>
  )
}
