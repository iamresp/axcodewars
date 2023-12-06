/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import { createPortal } from 'react-dom'

import cls from './styles.module.css'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  close: () => void
  title?: string
}

const ANIMATION_DELAY = 300

export const Modal: FC<ModalProps> = ({
  className,
  children,
  isOpen,
  close,
  title
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const handleClose = useCallback(() => {
    setIsClosing(true)
    timerRef.current = setTimeout(() => {
      close()
      setIsClosing(false)
    }, ANIMATION_DELAY)
  }, [close])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  if (!isOpen) return null

  return (
    <>
      {createPortal(
        <div
          className={classNames(
            cls.Modal,
            isOpen && cls.opened,
            isClosing && cls.isClosing,
            className
          )}
        >
          <div className={cls.overlay} onClick={handleClose}>
            <div
              className={cls.content}
              onClick={event => {
                event.stopPropagation()
              }}
            >
              <div className={cls.cross} onClick={handleClose} />
              {title && <p className={cls.title}>{title}</p>}
              {children}
            </div>
          </div>
        </div>,
        document.getElementById('modal') as HTMLElement
      )}
    </>
  )
}
