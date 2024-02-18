import { type RefObject, useCallback, useEffect } from 'react'

/**
 * Кастомный хук для выполнения действия при клике вне указанного элемента.
 * Этот хук предназначен для обработки событий клика вне компонента, например, для закрытия модального окна
 * при клике вне этих элементов.
 *
 * @template T Расширяет HTMLElement и указывает тип элемента, к которому применяется ссылка.
 * @param {RefObject<T>} ref Ссылка на элемент, вне которого должен определяться клик.
 * @param {() => void} handler Функция-обработчик, которая будет вызвана при клике вне элемента.
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement> (
  ref: RefObject<T>,
  handler: () => void
): void {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const el = ref?.current

    // Проверяем, содержит ли элемент цель клика, и если нет, вызываем handler
    if (el === null || el.contains(event.target as Node)) {
      return
    }

    handler()
  }, [ref, handler])

  useEffect(() => {
    // Добавляем обработчик события при монтировании компонента
    document.addEventListener('mousedown', handleClickOutside)

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside]) // Обеспечиваем, что обработчик будет добавлен и удален правильно
}
