import { toast } from 'react-toastify'

export const errorToast = (error: unknown): void => {
  if (error instanceof Error) {
    toast.error(error.message)

    return
  }

  toast.error(error as string)
}
