import { type ToastOptions, toast } from 'react-toastify'

export const toastFetchStatus = <T>(
  promise: Promise<T>,
  {
    error = 'Произошла ошибка!',
    pending = 'Загрузка...',
    success = 'Успешно!'
  },
  options?: ToastOptions
): void => {
  void toast.promise(
    promise,
    {
      error,
      pending,
      success
    },
    options
  )
}
