import React, { type FC } from 'react'
import { Button, Modal } from 'shared/components'

import cls from './TotalModal.module.css'

interface TotalModalProps {
  isOpen: boolean
  isWin: boolean
  onDecline: () => void
}

export const TotalModal: FC<TotalModalProps> = ({
  isOpen,
  isWin,
  onDecline
}) => {
  return (
    <Modal
      className={cls.modalTotal}
      title={ isWin ? 'Наши поздравления!' : 'Повезёт в другой раз!' }
      isOpen={isOpen}
    >
      <div className={cls.modalBlock}>
        <p className={cls.subtitle}>
          { isWin ? 'Вы победили!' : 'Вы проиграли!' }
        </p>
        <img src={ isWin ? './gifs/win.gif' : './gifs/lose.gif' }
          alt='TotalImage' className={cls.gifs}/>
        <Button
          isOrange
          type={'button'}
          className={cls.totalButton}
          onClick={onDecline}
          text={'Вернуться к задачам'} />
      </div>
    </Modal>
  )
}
