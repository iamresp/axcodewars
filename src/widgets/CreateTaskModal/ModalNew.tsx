import React, { useState, type FC, useEffect } from 'react'
import { Button, InputCustom, Modal, TextAreaCustom } from 'shared/components'
import { AnswerFormCustom } from 'features/AnswerForm/AnswerFormCustom'
import taskService from 'entities/TaskApi/task.service'
import { type ResultsType } from 'entities/TaskApi/task.interface'

import cls from './styles.module.css'
import { useSessionStorage } from 'shared/hooks/useSessionStorage'

interface ModalNewProps {
  isOpen: boolean
  close: () => void
  getTasks: () => void
}

export interface TaskCaseTypes {
  args: string
  result: string
}

interface CreateTaskObjTypes {
  description: string
  taskCase: TaskCaseTypes[]
  title: string
}

const STORAGE = 'create_task'

export const ModalNew: FC<ModalNewProps> = ({ isOpen, close, getTasks }) => {
  const [getStorage, setStorage] = useSessionStorage<CreateTaskObjTypes>(
    STORAGE,
    {
      description: '',
      taskCase: [{ args: '', result: '' }],
      title: ''
    }
  )
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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

  useEffect(() => {
    setStorage({ description, taskCase, title })
  }, [close])

  // useEffect(() => {
  //   console.log(getStorage.description)
  //   // if (isOpen) {
  //   setTitle(getStorage.title)
  //   setDescription(getStorage.description)
  //   // }
  // }, [isOpen, getStorage])

  return (
    <Modal title='Создание таски' isOpen={isOpen} close={close}>
      <form
        onSubmit={e => {
          void handleSubmit(e)
        }}
      >
        <div className={cls.createTask}>
          <InputCustom
            required
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
            placeholder='Название'
          />
          <TextAreaCustom
            required
            value={description}
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
