import React, { type Dispatch, type SetStateAction, type FC } from 'react'
import { TextAreaCustom } from 'shared/components'
import { type TaskCaseTypes } from 'widgets/TaskModal/constants'
import DeleteField from '../../shared/images/delete-field.svg'
import cls from './styles.module.css'

interface AnswerFormProps {
  className?: string
  taskCase: TaskCaseTypes[]
  setTaskCase: Dispatch<SetStateAction<TaskCaseTypes[]>>
  showRemoveButton?: boolean
}

export const AnswerForm: FC<AnswerFormProps> = ({
  taskCase,
  setTaskCase,
  className,
  showRemoveButton = false
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

  const removeField = (index: number): void => {
    const copiedCases = [...taskCase]
    copiedCases.splice(index, 1)
    setTaskCase(copiedCases)
  }

  return (
    <>
      {taskCase.map((taskCase, index) => (
        <div className={className} key={index}>
          <div className={cls.controlPanel}>
            {index > 2 && showRemoveButton &&
                <button onClick={() => {
                  removeField(index)
                }} className={cls.btnDeleteField}><DeleteField/></button>
            }

            <span>Пара вводимых значений {index + 1}</span>
          </div>

          <TextAreaCustom
            value={taskCase.args}
            onChange={e => {
              handleChangeTaskCase(index, e)
            }}
            placeholder='1 2'
            name='args'
            required
          />
          <TextAreaCustom
            placeholder='3'
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
