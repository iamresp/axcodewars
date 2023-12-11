import { type ToastOptions, toast } from 'react-toastify'
import { FETCH_STATUS } from 'shared/constants/constants'

export const toastFetchStatus = async <T>(
  promise: Promise<T> | (() => Promise<T>),
  {
    error = FETCH_STATUS.ERROR,
    pending = FETCH_STATUS.PENDING,
    success = 'Вы успешно создали таску!'
  },
  options?: ToastOptions
): Promise<T> => {
  try {
    const data = toast.promise(
      promise,
      {
        error,
        pending,
        success
      },
      options
    )
    console.log(data)

    return await data
  } catch (error) {
    throw new Error()
  }
}
