import React, {
  useState,
  useContext,
  type FC,
  type MutableRefObject
} from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { darcula } from '@uiw/codemirror-theme-darcula'
import { duotoneLight } from '@uiw/codemirror-theme-duotone'
import { ThemeContext } from 'app/context/ThemeContext'
import { Button } from 'shared/components'
import cls from './styles.module.css'

interface CodeEditorProps {
  socket?: MutableRefObject<WebSocket | null | undefined>
  isReady: boolean
  opponentCode?: string
  attempts: number
  onValidateCode: (timeout?: boolean, code?: string) => string
  isOpponent: boolean
}

export const CodeEditor: FC<CodeEditorProps> = ({
  socket,
  isReady,
  attempts,
  opponentCode,
  isOpponent,
  onValidateCode
}) => {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const { currentTheme } = useContext(ThemeContext)

  const sendCode = (value: string): void => {
    setCode(value)
    const message = {
      event: 'push',
      data: value
    }
    socket?.current?.send(JSON.stringify(message))
  }

  const handleClick = (): void => {
    const newMessage = onValidateCode(false, code)
    setMessage(newMessage)
  }

  return (
    <div className={cls.codeEditorContainer}>
      {isReady && (<p className={cls.attempts}>
        {isOpponent ? 'Попытки противника: ' : 'Ваши попытки: '}{attempts}
      </p>)}
      <CodeMirror
        value={isOpponent ? opponentCode : code}
        className={cls.codeEditor}
        height='100%'
        editable={isReady && !isOpponent}
        theme={currentTheme === 'light' ? duotoneLight : darcula}
        extensions={[javascript({ jsx: true })]}
        onChange={!isOpponent ? sendCode : undefined}
      />
      {!isOpponent && (
        <div className={cls.submitContainer}>
          {message.length > 0 && <div className={cls.alarm}>{message}</div>}
          {isReady && (
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
