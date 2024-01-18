import React, { useState, type FC, type MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { DropzoneCsv } from 'features/DropzoneCSV'
import { Button, Modal } from 'shared/components'
import taskService from 'entities/TaskApi/task.service'
import { type ResultsType } from 'entities/TaskApi/task.interface'
import { errorToast } from 'shared/lib/error-toast'

import cls from './styles.module.css'

interface CSVModalProps {
  isOpen: boolean
  close: () => void
  getTasks: () => Promise<void>
}

const INIT_STATE = [['']]

const resArr = (arr: string[], chunkSize: number = 2): ResultsType => {
  const res = []
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize)
    res.push(chunk)
  }

  return res
}

export const CSVModal: FC<CSVModalProps> = ({ isOpen, close, getTasks }) => {
  const [data, setData] = useState(INIT_STATE)

  const isBtnDisabled = data.length === 0 || data[0][0] === ''

  const handleDelete = (): void => {
    setData(INIT_STATE)
  }

  const handleClose = (): void => {
    close()
    setData(INIT_STATE)
  }

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): Promise<void> => {
    e.preventDefault()

    try {
      const taskArr = data.map(([title, description, ...results]) => {
        return {
          description,
          title,
          results: resArr(results)
        }
      })

      const response = await taskService.createTask(taskArr)

      if (response.omitted.length === 0) {
        toast.success('Все таски успешно загружены!')
        handleClose()
      } else {
        response.omitted.forEach((res, i) => {
          toast.error(`Ошибка: ${res.title}`, {
            autoClose: 15000 + i * 2000
          })
        })
        response.inserted.forEach((res, i) => {
          toast.success(`Успешно: ${res.title}`, {
            autoClose: 15000 + i * 2000
          })
        })

        handleDelete()
      }

      await getTasks()
    } catch (error) {
      errorToast(error)
    }
  }

  return (
    <Modal
      className={cls.modalCSV}
      title={'Загрузка CSV-файла'}
      isOpen={isOpen}
      close={close}
    >
      <DropzoneCsv data={data} setData={setData} />
      <div className={cls.btnGr}>
        <Button
          className={!isBtnDisabled ? cls.btnDisabled : ''}
          onClick={e => {
            void handleSubmit(e)
          }}
          type='submit'
          isOrange
          text={'Загрузить'}
          disabled={isBtnDisabled}
        />
        <Button onClick={handleDelete} text={'Удалить'} />
      </div>
    </Modal>
  )
}
