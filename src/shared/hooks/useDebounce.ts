import { useEffect, useState } from 'react'

/**
 * Кастомный хук для реализации механизма "debounce" для любого значения.
 * Это позволяет отложить обновление значения до тех пор, пока не пройдет определенное количество времени
 * после последнего изменения этого значения.
 *
 * @template T Тип значения, для которого применяется debounce.
 * @param {T} value Значение, для которого нужно применить debounce.
 * @param {number} [delay=500] Задержка в миллисекундах, после которой значение будет обновлено. По умолчанию 500 мс.
 * @return {T} Отложенное значение после применения механизма debounce.
 */
export function useDebounce<T> (value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Очистка таймера при размонтировании компонента или при изменении значения/задержки
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
