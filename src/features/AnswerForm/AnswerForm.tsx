import React, { type Dispatch, type SetStateAction, type FC } from 'react'
import { Button, TextAreaCustom } from 'shared/components'
import { type TaskCaseTypes } from 'widgets/TaskModal/constants'
import classNames from 'classnames'
import Delete from 'shared/images/delete-modal-field.svg'
import cls from './styles.module.css'

interface AnswerFormProps {
  className?: string
  taskCase: TaskCaseTypes[]
  setTaskCase: Dispatch<SetStateAction<TaskCaseTypes[]>>
}

export const AnswerForm: FC<AnswerFormProps> = ({
  taskCase,
  setTaskCase,
  className
}) => {
  const handleAddCase = (): void => {
    setTaskCase(prev => [...prev, { args: '', result: '' }])
  }

  const handleChangeTaskCase = (
    key: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target
    const copiedCases = [...taskCase]
    copiedCases[key][name as keyof TaskCaseTypes] = value

    setTaskCase(copiedCases)
  }

  return (
    <>
      {taskCase.map((task, index) => (
        <div className={classNames(className, cls.answerForm)} key={index}>
          <div className={cls.label}>
            {taskCase.length > 3 && (
              <button
                className={cls.deleteBtn}
                type='button'
                onClick={() => {
                  setTaskCase(prev => prev.filter((_, i) => i !== index))
                }}
              >
                <Delete />
              </button>
            )}
            <p>Поле {index + 1}</p>
          </div>
          <TextAreaCustom
            value={task.args}
            onChange={e => {
              handleChangeTaskCase(index, e)
            }}
            placeholder='Вводимые данные'
            name='args'
            required
          />
          <TextAreaCustom
            placeholder='Правильный ответ'
            value={task.result}
            onChange={e => {
              handleChangeTaskCase(index, e)
            }}
            name='result'
            required
          />
        </div>
      ))}
      <Button text='Добавить поля' onClick={handleAddCase} />
    </>
  )
}
