import React, { useState, type FC, type MouseEvent } from 'react'
import { DropzoneCsv } from 'features/DropzoneCSV'
import { Button, Modal } from 'shared/components'
import taskService from 'entities/TaskApi/task.service'

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
      //   const res: Array<Promise<any>> = data.map(
      //     async ([title, description, ...results]) => {
      //       return await taskService.createTask({
      //         description,
      //         title,
      //         results: resArr(results)
      //       })
      //     }
      //   )
      //   console.log(res)
      //   await Promise.all(res)

      for (const [title, description, ...results] of data) {
        try {
          await taskService.createTask({
            description,
            title,
            results: resArr(results)
          })
        } catch (e) {
          throw new Error()
        }
      }

      handleClose()
      getTasks()
    } catch (error) {
      throw new Error()
    }
  }

  return (
    <Modal title={'Загрузка CSV-файла'} isOpen={isOpen} close={close}>
      <DropzoneCsv data={data} setData={setData} />
      <div className={cls.btnGr}>
        <Button
          onClick={e => {
            void handleSubmit(e)
          }}
          type='submit'
          isOrange
          text={'Загрузить'}
        />
        <Button onClick={handleDelete} text={'Удалить'} />
      </div>
    </Modal>
  )
}
