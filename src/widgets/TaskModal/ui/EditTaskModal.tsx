import React, { useState, type FC, useEffect } from 'react'
import { AnswerFormCustom } from 'features/AnswerForm/AnswerFormCustom'
import { Button, InputCustom, Modal, TextAreaCustom } from 'shared/components'
import { type TaskCaseTypes, TASK_OBJ, TASK } from '../constants'
import taskService from 'entities/TaskApi/task.service'
import { type ResultsType } from 'entities/TaskApi/task.interface'

import cls from './styles.module.css'

interface EditTaskModalProps {
  isOpen: boolean
  close: () => void
  id: string
  getTasks: () => void
}

export const EditTaskModal: FC<EditTaskModalProps> = ({
  isOpen,
  close,
  id,
  getTasks
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [taskCase, setTaskCase] = useState<TaskCaseTypes[]>(
    TASK_OBJ[TASK.TASK_CASE]
  )

  const getTaskById = async (): Promise<void> => {
    try {
      const data = await taskService.getTaskById(id)
      setTitle(data.title)
      setDescription(data.description)

      setTaskCase(() =>
        data.results.map(([key, value]) => {
          return { args: key, result: value }
        })
      )

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = (): void => {
    close()
    setTitle('')
    setDescription('')
    setTaskCase(TASK_OBJ[TASK.TASK_CASE])
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const results: ResultsType = taskCase.map(el => {
      return Object.values(el)
    })

    try {
      console.log({ title, description, results })

      handleClose()
      getTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = (): void => {
    console.log('this button to delete')
  }

  useEffect(() => {
    if (id.length === 0 || !isOpen) return

    void getTaskById()
  }, [id, isOpen])

  return (
    <Modal title='Редактирование таски' isOpen={isOpen} close={close}>
      <form
        onSubmit={e => {
          handleSubmit(e)
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
          <Button type='submit' isOrange text={'Сохранить'} />
          <Button onClick={handleDelete} text={'Удалить'} />
        </div>
      </form>
    </Modal>
  )
}
