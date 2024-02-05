import React, {
  useState,
  useEffect,
  type FC
} from 'react'
import { TimerCustom } from 'features/TimerCustom'
import { Button, CodeEditor, Loading } from 'shared/components'
import { isSafe, convertParams, convertResult } from '../lib'
import cls from './CodeEditors.module.css'
import {
  type ICreateTask,
  type ResultsType
} from 'entities/TaskApi/task.interface'
import classNames from 'classnames'

interface CodeEditorsProps {
  isOpponentReady: boolean
  onReady: () => void
  onCode: (value: string) => void
  taskData: ICreateTask | undefined
  rightResults: ResultsType | undefined
  attempts: number
  opponentCode: string
  opponentAttempts: number
  onAttempt: () => void
  onWin: () => void
  isWin: boolean
  isLose: boolean
  setIsLose: (bool: boolean) => void
}

const taskTime = 300_000

export const CodeEditors: FC<CodeEditorsProps> = ({
  isOpponentReady,
  onReady,
  onCode,
  taskData,
  rightResults,
  attempts,
  opponentCode,
  opponentAttempts,
  onAttempt,
  onWin,
  isWin,
  isLose,
  setIsLose
}) => {
  const [isReady, setIsReady] = useState(false)

  const handleReady = (): void => {
    onReady()
    setIsReady(true)
  }

  const handleValidateCode = (
    code = ''
  ): string => {
    let result: unknown = null

    onAttempt()

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

    return 'Результат выполнения совпал с ответом'
  }

  useEffect(() => {
    if (isLose && !isWin) {
      void handleValidateCode()
    }
  }, [isLose])

  const codeEditorsStyle = classNames(
    [cls.codeEditorsContainer],
    {
      [cls.codeEditorsDisabled]: !(isReady && isOpponentReady)
    }
  )

  return (
    <>
      {isReady && isOpponentReady
        ? (
          <>
            <div className={cls.descriptionContainer}>
              <p className={cls.description}>{taskData?.description}</p>
              <div className={cls.results}>
                <p className={cls.resultsText}>
                Вводимые значения: {taskData?.results[0][0]}
                </p>
                <p className={cls.resultsText}>
                Результат: {taskData?.results[0][1]}
                </p>
              </div>
            </div>
            <TimerCustom
              isWin={isWin}
              ms={taskTime}
              isLose={isLose}
              setIsLose={setIsLose}
            />
          </>
        )
        : isReady
          ? <>
            <h3 className={cls.readyTitle}>
              Ждем пока соперник не будет готов...
            </h3>
            <Loading height={150} />
          </>
          : (
            <Button
              className={cls.readyButton}
              type='button'
              text='Готов'
              isOrange
              onClick={handleReady}
            >
            </Button>
          )}
      <div className={codeEditorsStyle}>
        <CodeEditor
          onCode={onCode}
          isReady={isReady}
          isOpponentReady={isOpponentReady}
          attempts={attempts}
          onValidateCode={handleValidateCode}
          isOpponent={false}
        />
        <CodeEditor
          isReady={isReady}
          isOpponentReady={isOpponentReady}
          attempts={opponentAttempts}
          onValidateCode={handleValidateCode}
          opponentCode={opponentCode}
          isOpponent
        />
      </div>
    </>
  )
}
