import { useState } from 'react'

export const useSessionStorage = <T>(
  keyName: string,
  defaultValue: T
): [T, (newValue: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = sessionStorage.getItem(keyName)

      if (value) {
        return JSON.parse(value)
      }

      // если не используешь useEffect
      // sessionStorage.setItem(keyName, JSON.stringify(defaultValue))

      return defaultValue
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = (newValue: T): void => {
    try {
      sessionStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {}
    setStoredValue(newValue)
  }

  const clearStorage = (): void => {
    sessionStorage.clear()
  }

  return [storedValue, setValue, clearStorage]
}
