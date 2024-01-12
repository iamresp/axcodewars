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
    let result: any = null

    onAttempt()

    const convertParams = (arr: string[]): string[] => {
      const newArr = arr.map(item => {
        if (isNaN(Number(item))) {
          return `${item}`
        } else {
          return item
        }
      })

      return newArr
    }

    if (rightResults === undefined) return ''

    for (const rightResult of rightResults) {
      try {
        const taskParams = rightResult[0].split(' ')
        result = eval(code + `\ntask(${convertParams(taskParams)})`)
      } catch (e) {
        if (e instanceof Error) {
          return `Ошибка в коде: ${e.message}`
        }
      }

      if ((result ?? '').toString() !== rightResult[1].toString()) {
        return 'Результат выполнения не совпал с ответом'
      } else {
        if (timeout) {
          isTimeOutLose()

          return ''
        }
      }
    }
    if (timeout) {
      isTimeOutLose()

      return ''
    }

    onWin()
    setIsWin(true)

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
