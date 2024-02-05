import React, {
  useState,
  useContext,
  type FC
} from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { darcula } from '@uiw/codemirror-theme-darcula'
import { duotoneLight } from '@uiw/codemirror-theme-duotone'
import { ThemeContext } from 'app/context/ThemeContext'
import { Button } from 'shared/components'
import cls from './styles.module.css'
import classNames from 'classnames'

interface CodeEditorProps {
  onCode?: (value: string) => void
  isReady: boolean
  isOpponentReady: boolean
  opponentCode?: string
  attempts: number
  onValidateCode: (code?: string) => string
  isOpponent: boolean
}

const initialCode = 'const task = () => {\n  //TO DO\n}'

export const CodeEditor: FC<CodeEditorProps> = ({
  onCode,
  isReady,
  isOpponentReady,
  attempts,
  opponentCode,
  isOpponent,
  onValidateCode
}) => {
  const [code, setCode] = useState(initialCode)
  const [message, setMessage] = useState('')
  const { currentTheme } = useContext(ThemeContext)

  const sendCode = (value: string): void => {
    if (onCode === undefined) return
    onCode(value)
    setCode(value)
  }

  const handleClick = (): void => {
    const newMessage = onValidateCode(code)
    setMessage(newMessage)
  }

  const codeEditorStyle = classNames(
    [cls.codeEditor],
    {
      [cls.selectNone]: isOpponent
    }
  )

  return (
    <div className={cls.codeEditorContainer}>
      {isReady && isOpponentReady && (<p className={cls.attempts}>
        {isOpponent ? 'Попытки противника: ' : 'Ваши попытки: '}{attempts}
      </p>)}
      <CodeMirror
        value={isOpponent ? opponentCode : code}
        className={codeEditorStyle}
        height='100%'
        editable={isReady && !isOpponent}
        theme={currentTheme === 'light' ? duotoneLight : darcula}
        extensions={[javascript({ jsx: true })]}
        onChange={!isOpponent ? sendCode : undefined}
      />
      {!isOpponent && (
        <div className={cls.submitContainer}>
          {message?.length > 0 && (
            <div className={cls.alarmMessage}>{message}</div>
          )}
          {isReady && isOpponentReady && (
            <Button
              className={cls.submitButton}
              type='button'
              isOrange
              text='Отправить'
              onClick={handleClick}
            >
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
