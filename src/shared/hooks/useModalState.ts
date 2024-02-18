import { useState } from 'react'

/**
 * Кастомный хук для управления состоянием модального окна.
 * Позволяет открывать и закрывать модальное окно, предоставляя булево состояние и функции для изменения этого состояния.
 *
 * @param {boolean} [defaultValue=false] Начальное состояние модального окна (открыто/закрыто).
 * @return {[boolean, () => void, () => void]} Возвращает массив, где первый элемент — текущее состояние модального окна (isOpen),
 * второй элемент — функция для открытия модального окна (open), и третий элемент — функция для закрытия модального окна (close).
 */
export const useModalState = (
  defaultValue: boolean = false
): [boolean, () => void, () => void] => {
  const [isOpen, setOpen] = useState(defaultValue)

  const open = (): void => {
    setOpen(true)
  }

  const close = (): void => {
    setOpen(false)
  }

  return [isOpen, open, close]
}
