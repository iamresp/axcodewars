import React, {
  useState,
  type FC,
  type ChangeEvent,
  useEffect,
  useRef
} from 'react'
import { Button, InputCustom, Modal, TextAreaCustom } from 'shared/components'
import { AnswerFormCustom } from 'features/AnswerForm/AnswerFormCustom'
import taskService from 'entities/TaskApi/task.service'
import { useSessionStorage } from 'shared/hooks/useSessionStorage'
import { type ResultsType } from 'entities/TaskApi/task.interface'
import {
  type CreateTaskObjTypes,
  type TaskCaseTypes,
  CREATE_TASK,
  STORAGE,
  CREATE_TASK_OBJ
} from '../constants'

import cls from './styles.module.css'

interface CreateTaskModalProps {
  isOpen: boolean
  close: () => void
  getTasks: () => void
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({
  isOpen,
  close,
  getTasks
}) => {
  const [getStorage, setStorage, clearStorage] =
    useSessionStorage<CreateTaskObjTypes>(STORAGE, CREATE_TASK_OBJ)

  const [title, setTitle] = useState(getStorage[CREATE_TASK.TITLE])
  const [description, setDescription] = useState(
    getStorage[CREATE_TASK.DESCRIPTION]
  )
  const [taskCase, setTaskCase] = useState<TaskCaseTypes[]>(
    getStorage[CREATE_TASK.TASK_CASE]
  )

  const [storageRender, setStorageRender] = useState(false)

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
      await taskService.createTask({ description, results, title })
      handleClose()
      getTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | any,
    type: string
  ): void => {
    switch (type) {
      case CREATE_TASK.TITLE:
        setTitle(e.target.value)
        break
      case CREATE_TASK.DESCRIPTION:
        setDescription(e.target.value)
        break
      case CREATE_TASK.TASK_CASE:
        setTaskCase(e)
        break
      default:
        break
    }
  }

  useEffect(() => {
    const testFoo = (): boolean => {
      return (
        title.trim().length === 0 &&
        description.trim().length === 0 &&
        taskCase[0].args.trim().length === 0 &&
        taskCase[0].result.trim().length === 0
      )
    }

    const currentStorage = sessionStorage.getItem(STORAGE)

    if (currentStorage != null && testFoo()) {
      clearStorage()
    } else if (storageRender && !testFoo()) {
      setStorage({ description, taskCase, title })
    }
  }, [close, storageRender])

  return (
    <Modal
      onClose={setStorageRender}
      title='Создание таски'
      isOpen={isOpen}
      close={close}
    >
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
              handleChange(e, CREATE_TASK.TITLE)
            }}
            placeholder='Название'
          />
          <TextAreaCustom
            required
            value={description}
            onChange={e => {
              handleChange(e, CREATE_TASK.DESCRIPTION)
            }}
            placeholder='Описание'
          />
          <AnswerFormCustom
            className={cls.answerForm}
            taskCase={taskCase}
            setTaskCase={res => {
              handleChange(res, CREATE_TASK.TASK_CASE)
            }}
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
