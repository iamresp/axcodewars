import React, { useState, type FC, useEffect } from 'react'
import { Button, InputCustom, Modal, TextAreaCustom } from 'shared/components'
import { AnswerFormCustom } from 'features/AnswerForm/AnswerFormCustom'
import taskService from 'entities/TaskApi/task.service'
import { useSessionStorage } from 'shared/hooks/useSessionStorage'
import { type ResultsType } from 'entities/TaskApi/task.interface'
import {
  type TaskObjTypes,
  STORAGE,
  TASK_OBJ,
  TASK,
  type TaskCaseTypes
} from '../constants'

import cls from './styles.module.css'
import { toastFetchStatus } from 'shared/lib/toastFetchingStatus'

interface CreateTaskModalProps {
  isOpen: boolean
  close: () => void
  getTasks: () => void
  openCSV: () => void
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({
  isOpen,
  close,
  getTasks,
  openCSV
}) => {
  const [getStorage, setStorage, clearStorage] =
    useSessionStorage<TaskObjTypes>(STORAGE, TASK_OBJ)

  const [title, setTitle] = useState(getStorage[TASK.TITLE])
  const [description, setDescription] = useState(getStorage[TASK.DESCRIPTION])
  const [taskCase, setTaskCase] = useState<TaskCaseTypes[]>(
    getStorage[TASK.TASK_CASE]
  )

  const [storageRender, setStorageRender] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleClose = (): void => {
    close()
    setTitle('')
    setDescription('')
    setTaskCase([{ args: '', result: '' }])
    clearStorage()
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    const results: ResultsType = taskCase.map(el => {
      return Object.values(el)
    })

    try {
      // const data = taskService.createTask({
      await taskService.createTask({
        description,
        results,
        title
      })

      handleClose()
      getTasks()
    } catch (error) {
      throw new Error()
    } finally {
      setIsLoading(false)
    }
  }

  const handleStorage = (): void => {
    setStorageRender(true)
    close()
  }

  useEffect(() => {
    const isAllEmpty = (): boolean => {
      return (
        title.trim().length === 0 &&
        description.trim().length === 0 &&
        taskCase[0].args.trim().length === 0 &&
        taskCase[0].result.trim().length === 0
      )
    }

    const currentStorage = sessionStorage.getItem(STORAGE)

    if (currentStorage !== null && isAllEmpty()) {
      clearStorage()
    } else if (storageRender && !isAllEmpty()) {
      setStorage({ description, taskCase, title })
    }
  }, [close, storageRender])

  return (
    <Modal title='Создание таски' isOpen={isOpen} close={handleStorage}>
      <form
        onSubmit={e => {
          toastFetchStatus(handleSubmit(e), {
            success: 'Вы успешно создали таску!'
          })
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
          <Button onClick={openCSV} text={'Загрузить из файла'} />
        </div>
      </form>
    </Modal>
  )
}
