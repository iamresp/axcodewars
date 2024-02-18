import React, { useState, useRef, useEffect, type FC } from 'react'
import { getTimeRemaining } from '../lib/getTimeRemaining'
import cls from './TimerCustom.module.css'
import classNames from 'classnames'

/**
 * Компонент для отображения таймера обратного отсчета.
 * Изменяет свой стиль в зависимости от результата игры (победа или поражение).
 *
 * @param {Object} props Свойства компонента.
 * @param {boolean} props.isWin Флаг победы в игре.
 * @param {number} props.ms Время в миллисекундах для таймера обратного отсчета.
 * @param {boolean} props.isLose Флаг поражения в игре.
 * @param {Function} props.setIsLose Функция для установки состояния поражения.
 */

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

  // Стилизация таймера в зависимости от результата игры
  const timerStyle = classNames(
    [cls.timer],
    {
      [cls.timerGreen]: isWin,
      [cls.timerRed]: isLose
    })

  /**
   * Запускает таймер обратного отсчета до заданной даты.
   *
   * @param {Date} date Дата, до которой будет идти обратный отсчет.
   */
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

  /**
   * Очищает таймер и устанавливает новый таймер обратного отсчета.
   *
   * @param {Date} date Дата, до которой будет идти обратный отсчет.
   */
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

  /**
   * Возвращает дату окончания обратного отсчета.
   *
   * @return {Date} Дата окончания обратного отсчета.
   */
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
