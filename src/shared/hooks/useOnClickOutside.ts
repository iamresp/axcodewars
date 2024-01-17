import { type RefObject, useCallback, useEffect } from 'react'

export function useOnClickOutside<T extends HTMLElement = HTMLElement> (
  ref: RefObject<T>,
  handler: () => void
): void {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const el = ref?.current

    if (el === null || el.contains(event.target as Node)) {
      return
    }

    handler()
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}
