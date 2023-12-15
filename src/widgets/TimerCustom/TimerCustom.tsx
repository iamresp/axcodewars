import React, { useState, useRef, useEffect } from 'react'
import cls from './TimerCustom.module.css'

interface Props {
  millySec: number
  setTime: (bool: boolean) => void
}

export const TimerCustom = ({ millySec, setTime }: Props) => {
  const Ref = useRef<NodeJS.Timer | null>(null)

  const [timer, setTimer] = useState('')

  const getTimeRemaining = (e: Date) => {
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
    // setTimer('00:00:15')

    if (Ref.current) clearInterval(Ref.current)

    const timerId = setInterval(() => {
      startTimer(e)
    })

    Ref.current = timerId
  }

  const getDeadTime = (): Date => {
    const deadline = new Date()

    deadline.setSeconds(deadline.getSeconds() + millySec / 1000)

    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadTime())
  }, [])

  return <h2 className={cls.timer}>{timer}</h2>
}
