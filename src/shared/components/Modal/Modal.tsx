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
import { useOnClickOutside } from 'shared/hooks/useOnClickOutside'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  close: () => void
  title?: string
}

const ANIMATION_DELAY = 0

export const Modal: FC<ModalProps> = ({
  className,
  children,
  isOpen,
  close,
  title
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const node = useRef<HTMLDivElement | null>(null)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    timerRef.current = setTimeout(() => {
      close()
      setIsClosing(false)
    }, ANIMATION_DELAY)
  }, [close])

  useOnClickOutside(node, handleClose)

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
            cls.modal,
            isOpen && cls.opened,
            isClosing && cls.isClosing
          )}
        >
          <div className={cls.overlay}>
            <div ref={node} className={classNames(cls.content, className)}>
              <div
                role='button'
                tabIndex={0}
                className={cls.cross}
                onClick={handleClose}
                onKeyDown={() => {}}
              />
              {Boolean(title) && <p className={'main-title-modal'}>{title}</p>}
              {children}
            </div>
          </div>
        </div>,
        document.getElementById('modal') as HTMLElement
      )}
    </>
  )
}
