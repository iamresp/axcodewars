import { useState } from 'react'

export const useModalState = (
  defaultValue = false
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
