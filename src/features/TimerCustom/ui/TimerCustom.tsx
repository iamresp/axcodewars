import React, { useState, useRef, useEffect, type FC } from 'react'
import { startTimer } from '../lib/startTimer'
import cls from './TimerCustom.module.css'

interface TimerCustomProps {
  ms: number
  setTime: (bool: boolean) => void
}

export const TimerCustom: FC<TimerCustomProps> = ({ ms, setTime }) => {
  const Ref = useRef<NodeJS.Timer | null>(null)

  const [timer, setTimer] = useState('')

  const clearTimer = (date: Date): void => {
    if (Ref.current !== null) clearInterval(Ref.current)

    const timerId = setInterval(() => {
      const newTimer = startTimer(date)
      newTimer === false ? setTime(!newTimer) : setTimer(newTimer.toString())
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
  }, [])

  return <h2 className={cls.timer}>{timer}</h2>
}
