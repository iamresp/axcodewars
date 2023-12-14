import React, { type Dispatch, type SetStateAction, type FC } from 'react'
import { TextAreaCustom } from 'shared/components'
import { type TaskCaseTypes } from 'widgets/TaskModal/constants'

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
      {taskCase.map((taskCase, index) => (
        <div className={className} key={index}>
          <TextAreaCustom
            value={taskCase.args}
            onChange={e => {
              handleChangeTaskCase(index, e)
            }}
            placeholder='Вводимые данные'
            name='args'
            required
          />
          <TextAreaCustom
            placeholder='Правильный ответ'
            value={taskCase.result}
            onChange={e => {
              handleChangeTaskCase(index, e)
            }}
            name='result'
            required
          />
        </div>
      ))}
    </>
  )
}
