import { toast } from 'react-toastify'

/**
 * Выводит уведомление об ошибке с использованием react-toastify.
 * Проверяет, является ли переданная ошибка экземпляром класса Error, и в зависимости от этого выводит соответствующее сообщение.
 * Если ошибка является экземпляром Error, выводится сообщение об ошибке, иначе ошибка приводится к строке и также выводится.
 *
 * @param {unknown} error Ошибка для отображения. Может быть любого типа, но предпочтительно использовать экземпляры Error.
 */
export const errorToast = (error: unknown): void => {
  if (error instanceof Error) {
    toast.error(error.message) // Выводит сообщение об ошибке, если ошибка является экземпляром Error.

    return
  }

  toast.error(error as string) // Приводит ошибку к строке и выводит, если она не является экземпляром Error.
}
