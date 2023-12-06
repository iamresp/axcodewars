import React, { type FC } from 'react'
import cls from './styles.module.css'
import { InputCustom, Modal, TextAreaCustom } from '../../shared/components'

interface ModalNewProps {
  isOpen: boolean
  close: () => void
}

export const ModalNew: FC<ModalNewProps> = ({ isOpen, close }) => {
  return (
    <Modal title='Создание таски' isOpen={isOpen} close={close}>
      <div className={cls.createTask}>
        <InputCustom />
        <TextAreaCustom />
        <input type='text' />
        <input type='text' />
        <button type='button'>press</button>
      </div>
    </Modal>
  )
}
