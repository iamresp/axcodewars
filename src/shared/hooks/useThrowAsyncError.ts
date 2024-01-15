import { useState } from 'react'

export const useThrowAsyncError = (): (e: unknown) => void => {
  const [, setState] = useState()

  return (error: unknown) => {
    setState(() => {
      throw error
    })
  }
}
