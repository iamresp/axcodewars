interface TimerType {
  total: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Вычисляет оставшееся время до указанной даты.
 *
 * Функция возвращает объект, содержащий общее количество миллисекунд до заданной даты,
 * а также разбивку этого времени на часы, минуты и секунды.
 *
 * @param {Date} date Целевая дата, до которой необходимо вычислить оставшееся время.
 * @return {TimerType} Объект с полями total (общее количество миллисекунд до даты),
 * hours (часы), minutes (минуты) и seconds (секунды).
 */
export const getTimeRemaining = (date: Date): TimerType => {
  const total = Date.parse(
    date.toString()) - Date.parse(new Date().toString())
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
