import { useEffect, useState } from 'react'

export function useCursor () {
  const [hovered, setHover] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'

    return () => {}
  }, [hovered])

  return {
    onPointerOver: () => {
      setHover(true)
    },
    onPointerOut: () => {
      setHover(false)
    }
  }
}
