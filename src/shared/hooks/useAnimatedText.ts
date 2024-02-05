import { useEffect, useRef } from 'react'
import { useSpring } from 'framer-motion'

export function useAnimatedText (target: number, transition: { duration: number, bounce: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const value = useSpring(target, { duration: transition.duration, bounce: transition.bounce })

  useEffect(() => {
    if (ref.current) {
      ref.current.innerText = target.toFixed(2)
    }

    // Заменить эту строку на соответствующую альтернативу из документации `framer-motion`
    return value.onChange(v => {
      if (ref.current) {
        ref.current.innerText = v.toFixed(2)
      }
    })
  })
  useEffect(() => {
    value.set(target)
  }, [target])

  return ref
}
