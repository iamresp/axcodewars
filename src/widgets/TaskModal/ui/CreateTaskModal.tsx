import React, { useState, type FC, useEffect } from 'react'
import { Button, InputCustom, Modal, TextAreaCustom } from 'shared/components'
import { AnswerForm } from 'features/AnswerForm'
import taskService from 'entities/TaskApi/task.service'
import { useSessionStorage } from 'shared/hooks/useSessionStorage'
import { type ResultsType } from 'entities/TaskApi/task.interface'
import {
  type TaskObjTypes,
  STORAGE,
  taskObj,
  type TaskCaseTypes, taskCaseInitial
} from '../constants'
import { errorToast } from 'shared/lib/error-toast'
import { toast } from 'react-toastify'
import cls from './styles.module.css'

/**
 * Модальное окно для создания новой таски. Позволяет пользователю ввести название, описание и кейсы для таски.
 * Интегрирует функционал сохранения ввода в sessionStorage для удобства пользователя и предотвращения потери данных.
 * Предоставляет опцию для загрузки тасок из CSV-файла и отправки созданной таски на сервер.
 *
 * @param {Object} props Свойства компонента.
 * @param {boolean} props.isOpen Состояние открытия модального окна.
 * @param {Function} props.close Функция для закрытия модального окна.
 * @param {Function} props.getTasks Функция для получения списка тасок после создания новой задачи.
 * @param {Function} props.openCSV Функция для открытия модального окна загрузки задач из CSV-файла.
 */

interface CreateTaskModalProps {
  isOpen: boolean
  close: () => void
  getTasks: () => Promise<void>
  openCSV: () => void
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({
  isOpen,
  close,
  getTasks,
  openCSV
}) => {
  const [getStorage, setStorage, clearStorage] =
    useSessionStorage<TaskObjTypes>(STORAGE, taskObj)

  const [title, setTitle] = useState(getStorage.title)
  const [description, setDescription] = useState(getStorage.description)
  const [taskCase, setTaskCase] = useState<TaskCaseTypes[]>(getStorage.taskCase)
  const [storageRender, setStorageRender] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleClose = (): void => {
    close()
    setTitle('')
    setDescription('')
    setTaskCase([
      { args: '', result: '' },
      { args: '', result: '' },
      { args: '', result: '' }
    ])

    clearStorage()
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    const results: ResultsType = taskCase.map(el => {
      return Object.values(el)
    })

    try {
      const data = await taskService.createTask({
        description,
        results,
        title
      })

      if (data.inserted.length > 0) {
        toast.success('Таска успешно создана!')
        handleClose()
        await getTasks()

        return
      }

      toast.error('Не удалось загрузить таску!')
    } catch (error) {
      errorToast(error)
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
          void handleSubmit(e)
        }}
      >
        <div className={cls.createTask}>
          <h2 className={cls.title}>Название и описание таски</h2>
          <InputCustom
            required
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
            label='Название'
          />
          <TextAreaCustom
            required
            value={description}
            onChange={e => {
              setDescription(e.target.value)
            }}
            label='Описание'
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
            <Button type='submit' isOrange text='Создать' />
            <Button onClick={openCSV} text='Загрузить из файла' />
          </div>
        </div>
      </form>
    </Modal>
  )
}
