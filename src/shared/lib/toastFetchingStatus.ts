import {
  type ToastOptions, toast,
  type ToastContentProps
} from 'react-toastify'

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
      error: {
        render (body: ToastContentProps<{ message: string }>) {
          return body.data?.message
        }
      },
      pending,
      success
    },
    options
  )
}
