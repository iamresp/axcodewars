import React, {
  useState,
  useEffect,
  type FC,
  type MutableRefObject
} from 'react'
import { TimerCustom } from 'features/TimerCustom'
import { Button } from 'shared/components'
import cls from './CodeEditors.module.css'
import { CodeEditor } from 'shared/components/CodeEditor/CodeEditor'

interface CodeEditorsProps {
  socket: MutableRefObject<WebSocket | null | undefined>
  rightResult: string
  attempts: number
  opponentCode: string
  opponentAttempts: number
  onAttempt: () => void
  onWin: () => void
  isTimeOutLose: () => void
}

const taskTime = 300_000

export const CodeEditors: FC<CodeEditorsProps> = ({
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
  const [timer, setTimer] = useState(false)

  const handleValidateCode = (
    timeout = false,
    code = ''
  ): string => {
    let result = null

    try {
      result = eval(code)
    } catch (e) {
      if (e instanceof Error) {
        return `Ошибка в коде: ${e.message}`
      }
    }

    onAttempt()

    if (result !== null && result?.toString() !== code) {
      if ((result ?? '').toString() === rightResult) {
        onWin()

        return 'Результат выполнения совпал с ответом'
      } else {
        if (timeout) {
          isTimeOutLose()

          return ''
        }

        return 'Результат выполнения не совпал с ответом'
      }
    } else {
      if (timeout) {
        isTimeOutLose()

        return ''
      }

      return 'Ошибка в коде'
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
          <Button
            className={cls.readyButton}
            type='button'
            text='Готов'
            isOrange
            onClick={() => {
              setIsReady(true)
            }}
          >
          </Button>
        )}
      <div className={cls.codeEditorsContainer}>
        <CodeEditor
          socket={socket}
          isReady={isReady}
          attempts={attempts}
          onValidateCode={handleValidateCode}
          isOpponent={false}
        />
        <CodeEditor
          isReady={isReady}
          attempts={opponentAttempts}
          onValidateCode={handleValidateCode}
          opponentCode={opponentCode}
          isOpponent
        />
      </div>
    </>
  )
}
