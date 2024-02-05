import React, { useState, useRef, useEffect, type FC } from 'react'
import { getTimeRemaining } from '../lib/getTimeRemaining'
import cls from './TimerCustom.module.css'
import classNames from 'classnames'

interface TimerCustomProps {
  isWin: boolean
  ms: number
  isLose: boolean
  setIsLose: (bool: boolean) => void
}

export const TimerCustom: FC<TimerCustomProps> = ({
  isWin,
  ms,
  isLose,
  setIsLose
}) => {
  const Ref = useRef<NodeJS.Timer | null>(null)

  const [timer, setTimer] = useState('')

  const timerStyle = classNames(
    [cls.timer],
    {
      [cls.timerGreen]: isWin,
      [cls.timerRed]: isLose
    })

  const startTimer = (date: Date): void => {
    const { total, hours, minutes, seconds } = getTimeRemaining(date)
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      )
    }

    setIsLose(total === 0)
  }

  const clearTimer = (date: Date): void => {
    if (Ref.current !== null) {
      clearInterval(Ref.current)

      return
    }

    const timerId = setInterval(() => {
      startTimer(date)
    })

    Ref.current = timerId
  }

  const getDeadTime = (): Date => {
    const deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + ms / 1000)

    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadTime())
  }, [isLose, isWin])

  return <h3 className={timerStyle}>{timer}</h3>
}
