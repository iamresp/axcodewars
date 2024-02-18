import React, { useState, type FC, useEffect } from 'react'
import { AnswerForm } from 'features/AnswerForm'
import { Button, InputCustom, Modal, TextAreaCustom } from 'shared/components'
import { type TaskCaseTypes, taskObj } from '../constants'
import taskService from 'entities/TaskApi/task.service'

import cls from './styles.module.css'
import { errorToast } from 'shared/lib/error-toast'
import { type TaskUpdateInput } from 'entities/TaskApi/task.interface'
import { toast } from 'react-toastify'

interface EditTaskModalProps {
  isOpen: boolean
  close: () => void
  id: string
  getTasks: () => Promise<void>
}

export const EditTaskModal: FC<EditTaskModalProps> = ({
  isOpen,
  close,
  id,
  getTasks
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [taskCase, setTaskCase] = useState<TaskCaseTypes[]>(taskObj.taskCase)

  const getTaskById = async (): Promise<void> => {
    try {
      const data = await taskService.getTaskById(id)
      setTitle(data.title)
      setDescription(data.description)

      setTaskCase(() => data.results.map(([key, value]) => {
        return { args: key, result: value }
      })
      )
    } catch (error) {
      errorToast(error)
    }
  }

  const handleClose = (): void => {
    close()
    setTitle('')
    setDescription('')
    setTaskCase([
      { args: '', result: '' },
      { args: '', result: '' },
      { args: '', result: '' }
    ])
  }

  const handleClearFields = (): void => {
    setTitle('')
    setDescription('')
    setTaskCase([
      { args: '', result: '' },
      { args: '', result: '' },
      { args: '', result: '' }
    ])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      const taskToUpdate: TaskUpdateInput = {
        title,
        description,
        results: taskCase.map(({ args, result }) => [args, result])
      }
      console.log(taskToUpdate)
      await taskService.updateTask(id, taskToUpdate)
      handleClose()
      await getTasks()
    } catch (error) {
      toast.error('Не удалось отредактировать таску!')
    }
  }

  const handleDelete = async (): Promise<void> => {
    try {
      await taskService.deleteTask(id)
      handleClose()
      await getTasks()
    } catch (error) {
      errorToast(error)
    }
  }

  useEffect(() => {
    if (id.length === 0 || !isOpen) return

    void getTaskById()
  }, [id, isOpen])

  return (
    <Modal title='Редактирование таски' isOpen={isOpen} close={close}>
      <form
        onSubmit={e => {
          void handleSubmit(e)
        }}
      >
        <div className={cls.createTask}>
          <h2>Название таски и описание</h2>
          <InputCustom
            required
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
            label={'Название'}
          />
          <TextAreaCustom
            required
            value={description}
            onChange={e => {
              setDescription(e.target.value)
            }}
            label={'Описание'}
          />
          <AnswerForm
            className={cls.answerForm}
            taskCase={taskCase}
            setTaskCase={setTaskCase}
          />
        </div>
        <div className={cls.btnGp}>
          <Button text='Очистить поля' onClick={handleClearFields} />
          <div className={cls.btnFooter}>
            <Button type='submit' isOrange text='Сохранить'/>
            <Button onClick={handleDelete} text='Удалить'/>
          </div>
        </div>
      </form>
    </Modal>
  )
}
