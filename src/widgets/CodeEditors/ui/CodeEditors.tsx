import React, {
  useState,
  useEffect,
  type FC,
  type MutableRefObject
} from 'react'
import { TimerCustom } from 'features/TimerCustom'
import { Button, CodeEditor } from 'shared/components'
import cls from './CodeEditors.module.css'
import { type ResultsType } from 'entities/TaskApi/task.interface'

interface CodeEditorsProps {
  socket: MutableRefObject<WebSocket | null | undefined>
  rightResults: ResultsType | undefined
  attempts: number
  opponentCode: string
  opponentAttempts: number
  onAttempt: () => void
  onWin: () => void
  isTimeOutLose: () => void
}

const taskTime = 300_000
const regexp = /while\(true\)|while\(!false\)|document\.|cookie|sessionstorage|localstorage|window/mg

export const CodeEditors: FC<CodeEditorsProps> = ({
  socket,
  rightResults,
  attempts,
  opponentCode,
  opponentAttempts,
  onAttempt,
  onWin,
  isTimeOutLose
}) => {
  const [isReady, setIsReady] = useState(false)
  const [timer, setTimer] = useState(false)
  const [isWin, setIsWin] = useState(false)

  const handleValidateCode = (
    timeout = false,
    code = ''
  ): string => {
    let result: unknown = null

    onAttempt()

    const isSafe = (code: string): RegExpMatchArray | null => {
      const checkingCode = code.replace(/\s/g, '')
      const isMatch = checkingCode.match(regexp)

      return isMatch
    }

    const convertParams = (params: string[]): string => {
      const newArr = params.map(param => {
        try {
          if (JSON.parse(param) !== undefined) {
            return param
          }

          return param
        } catch (e) {
          return JSON.stringify(param)
        }
      })

      return newArr.join(', ')
    }

    const convertResult = (result: unknown): string => {
      if (typeof result === 'object') {
        return JSON.stringify(result)
      }

      return String(result)
    }

    if (rightResults === undefined) return ''

    const checkedCode = isSafe(code)
    if (checkedCode !== null) {
      return `Недопустимый код: ${checkedCode.toString()}`
    }

    for (const rightResult of rightResults) {
      try {
        const taskParams = rightResult[0].split(' ')
        result = eval(`${code}\ntask(${convertParams(taskParams)})`)
      } catch (e) {
        if (e instanceof Error) {
          return `Ошибка в коде: ${e.message}`
        }
      }

      if (convertResult(result) !== rightResult[1].toString()) {
        return 'Результат выполнения не совпал с ответом'
      }
    }

    onWin()
    setIsWin(true)

    if (timeout) {
      isTimeOutLose()
    }

    return 'Результат выполнения совпал с ответом'
  }

  useEffect(() => {
    if (timer && !isWin) {
      void handleValidateCode(timer)
    }
  }, [timer])

  return (
    <>
      {isReady
        ? (
          <TimerCustom
            isWin={isWin}
            ms={taskTime}
            time={timer}
            setTime={setTimer} />
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
