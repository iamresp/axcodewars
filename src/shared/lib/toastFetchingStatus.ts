import { type ToastOptions, toast } from 'react-toastify'
import { FETCH_STATUS } from 'shared/constants/constants'

export const toastFetchStatus = <T>(
  promise: Promise<T>,
  {
    error = FETCH_STATUS.ERROR,
    pending = FETCH_STATUS.PENDING,
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
