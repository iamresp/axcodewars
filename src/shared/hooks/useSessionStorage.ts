import { useState } from 'react'

/**
 * Кастомный хук для работы с sessionStorage. Позволяет сохранять и извлекать данные,
 * используя JSON для сериализации и десериализации значений.
 *
 * @template T Тип данных, хранимых под ключом `keyName`.
 * @param {string} keyName Имя ключа для сохранения и извлечения данных из sessionStorage.
 * @param {T} defaultValue Значение по умолчанию, используемое если в sessionStorage нет значения или при ошибке чтения.
 * @return {[T, (newValue: T) => void, () => void]} Возвращает текущее хранимое значение, функцию для обновления этого значения
 * и функцию для очистки sessionStorage.
 */
export const useSessionStorage = <T>(
  keyName: string,
  defaultValue: T
): [T, (newValue: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = sessionStorage.getItem(keyName)

      // Попытка десериализовать значение из sessionStorage или использовать значение по умолчанию
      if (value != null) {
        return JSON.parse(value)
      }

      return defaultValue
    } catch (err) {
      console.error('Ошибка при чтении из sessionStorage:', err)

      return defaultValue
    }
  })

  /**
   * Функция для обновления значения в sessionStorage и состоянии хука.
   * @param {T} newValue Новое значение для сохранения под ключом `keyName`.
   */
  const setValue = (newValue: T): void => {
    try {
      sessionStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {
      console.error('Ошибка при записи в sessionStorage:', err)
    }
    setStoredValue(newValue)
  }

  /**
   * Функция для очистки всего sessionStorage.
   */
  const clearStorage = (): void => {
    sessionStorage.clear()
  }

  return [storedValue, setValue, clearStorage]
}
