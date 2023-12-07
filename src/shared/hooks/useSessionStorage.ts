// import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'

// const getSessionStorageOrDefault = <T>(key: string, defaultValue: T): T => {
//   const stored = sessionStorage.getItem(key)

//   if (!stored) {
//     return defaultValue
//   }

//   return JSON.parse(stored)
// }

// export const useSessionStorage = <T>(
//   key: string,
//   defaultValue: T
// ): [T, Dispatch<SetStateAction<T>>] => {
//   const [value, setValue] = useState(
//     getSessionStorageOrDefault(key, defaultValue)
//   )

//   useEffect(() => {
//     sessionStorage.setItem(key, JSON.stringify(value))
//   }, [key, value])

//   return [value, setValue]
// }

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

      sessionStorage.setItem(keyName, JSON.stringify(defaultValue))

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
