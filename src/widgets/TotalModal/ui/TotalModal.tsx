import React, { type FC } from 'react'
import { Button, Modal } from 'shared/components'
import { useNavigate } from 'react-router-dom'

import cls from './style.module.css'
import { AUTH_STATE } from 'pages/AuthPage/constants'

interface TotalModalProps {
  isOpen: boolean
  isWin: boolean
}

export const TotalModal: FC<TotalModalProps> = ({ isOpen, isWin }) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/tasks')
  }

  return (
    <Modal
      className={cls.modalTotal}
      title={ isWin ? 'Наши поздравления!' : 'Повезёт в другой раз!' }
      isOpen={isOpen}
    >
      <div>
        <p className={cls.subtitle}>{ isWin ? 'Вы победили!' : 'Вы проиграли!' }</p>
        <img src={ isWin ? './gifs/win.gif' : './gifs/lose.gif' } alt='TotalImage' className={cls.gifs}/>
        <Button
          isOrange
          type={'button'}
          className={cls.totalButton}
          onClick={handleNavigate}
          text={'Вернуться к задачам'} />
      </div>
    </Modal>
  )
}
