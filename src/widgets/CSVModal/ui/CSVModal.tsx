import React, { useState, type FC, type MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { DropzoneCsv } from 'features/DropzoneCSV'
import { Button, Modal } from 'shared/components'
import taskService from 'entities/TaskApi/task.service'
import { type ICreateTask } from 'entities/TaskApi/task.interface'

import cls from './styles.module.css'

interface CSVModalProps {
  isOpen: boolean
  close: () => void
  getTasks: () => void
}

const INIT_STATE = [['']]

const resArr = (arr: string[], chunkSize: number = 2) => {
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
      const promiseArr: Array<Promise<ICreateTask>> = []

      for (const [title, description, ...results] of data) {
        promiseArr.push(
          taskService.createTask({
            description,
            title,
            results: resArr(results)
          })
        )
      }

      const tasksData = await Promise.allSettled(promiseArr)

      if (!tasksData.some(el => el.status === 'rejected')) {
        toast.success('Все таски успешно загружены!')
        handleClose()
      } else {
        tasksData.forEach((res, i) => {
          if (res.status === 'rejected') {
            toast.error(`Ошибка таски: ${data[i][0]} - ${res.reason}`, {
              autoClose: 15000 + i * 2000
            })
            console.error(res)
          } else {
            toast.success(`Успешно: ${data[i][0]} - ${res.status}`, {
              autoClose: 15000 + i * 2000
            })
          }
        })

        handleDelete()
      }

      getTasks()
    } catch (error) {
      throw new Error()
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
          className={isBtnDisabled ? cls.btnDisabled : ''}
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
