interface TimerType {
  total: number
  hours: number
  minutes: number
  seconds: number
}

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
