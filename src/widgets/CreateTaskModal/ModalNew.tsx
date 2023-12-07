import React, { useState, type FC } from 'react'
import { Button, InputCustom, Modal, TextAreaCustom } from 'shared/components'
import { AnswerFormCustom } from 'features/AnswerForm/AnswerFormCustom'
import taskService from 'entities/TaskApi/task.service'
import { type ResultsType } from 'entities/TaskApi/task.interface'

import cls from './styles.module.css'

interface ModalNewProps {
  isOpen: boolean
  close: () => void
  getTasks: () => void
}

export interface TaskCaseTypes {
  args: string
  result: string
}

export const ModalNew: FC<ModalNewProps> = ({ isOpen, close, getTasks }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [taskCase, setTaskCase] = useState<TaskCaseTypes[]>([
    { args: '', result: '' }
  ])

  const handleClose = (): void => {
    close()
    setTitle('')
    setDescription('')
    setTaskCase([{ args: '', result: '' }])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const results: ResultsType = taskCase.map(el => {
      return Object.values(el)
    })

    try {
      await taskService.createTask({ description, results, title })
      handleClose()
      getTasks()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal title='Создание таски' isOpen={isOpen} close={close}>
      <form
        onSubmit={e => {
          void handleSubmit(e)
        }}
      >
        <div className={cls.createTask}>
          <InputCustom
            onChange={e => {
              setTitle(e.target.value)
            }}
            placeholder='Название'
          />
          <TextAreaCustom
            onChange={e => {
              setDescription(e.target.value)
            }}
            placeholder='Описание'
          />
          <AnswerFormCustom
            className={cls.answerForm}
            taskCase={taskCase}
            setTaskCase={setTaskCase}
          />
        </div>
        <div className={cls.btnGp}>
          <Button type='submit' isOrange text={'Создать'} />
          <Button text={'Загрузить из файла'} />
        </div>
      </form>
    </Modal>
  )
}
