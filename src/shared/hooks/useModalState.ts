import { useState } from 'react'

export const useModalState = (
  defaultValue = false
): [boolean, () => void, () => void] => {
  const [isOpen, setOpen] = useState(defaultValue)

  const open = () => {
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
  }

  return [isOpen, open, close]
}
