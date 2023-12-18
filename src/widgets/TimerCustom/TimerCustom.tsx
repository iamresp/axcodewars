import React, { useState, useRef, useEffect, type FC } from 'react'
import cls from './TimerCustom.module.css'

interface TimerCustomProps {
  ms: number
  setTime: (bool: boolean) => void
}

interface TimerType {
  total: number
  hours: number
  minutes: number
  seconds: number
}

export const TimerCustom: FC<TimerCustomProps> = ({ ms, setTime }) => {
  const Ref = useRef<NodeJS.Timer | null>(null)

  const [timer, setTimer] = useState('')

  const getTimeRemaining = (e: Date): TimerType => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)

    return {
      total,
      hours,
      minutes,
      seconds
    }
  }

  const startTimer = (e: Date): void => {
    const { total, hours, minutes, seconds } = getTimeRemaining(e)
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      )
    }
    setTime(total === 0)
  }

  const clearTimer = (e: Date): void => {
    if (Ref.current !== null) clearInterval(Ref.current)

    const timerId = setInterval(() => {
      startTimer(e)
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
