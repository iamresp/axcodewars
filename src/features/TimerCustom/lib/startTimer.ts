interface TimerType {
  total: number
  hours: number
  minutes: number
  seconds: number
}

const getTimeRemaining = (date: Date): TimerType => {
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

export const startTimer = (date: Date): string | boolean => {
  const { total, hours, minutes, seconds } = getTimeRemaining(date)
  if (total >= 0) {
    return (
      (hours > 9 ? hours : '0' + hours) +
        ':' +
        (minutes > 9 ? minutes : '0' + minutes) +
        ':' +
        (seconds > 9 ? seconds : '0' + seconds)
    )
  }

  return total === 0
}
