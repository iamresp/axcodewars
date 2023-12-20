import React, { type FC, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type ICreateTask } from 'entities/TaskApi/task.interface'
import taskService from 'entities/TaskApi/task.service'
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'

import cls from './TaskPage.module.css'
import { CodeEditor } from 'widgets/CodeEditor'

export const TaskPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const socket = useRef<WebSocket | null>()

  const [isConnected, setIsConnected] = useState(false)
  const [isOpponent, setIsOpponent] = useState(false)
  const [opponentCode, setOpponentCode] = useState('')
  const [opponentAttempts, setOpponentAttempts] = useState(0)
  const [taskData, setTaskData] = useState<ICreateTask>()
  const [attempts, setAttempts] = useState(0)
  const [rightResult, setRightResult] = useState('')

  const [open, setOpen] = useState(false)
  const [gameMessage, setGameMessage] = useState('')

  useEffect(() => {
    const getTask = async (): Promise<void> => {
      try {
        const data = await taskService.getTaskById(id ?? '')
        setTaskData(data)
        setRightResult(data.results[0][1])
      } catch (error) {
        throw new Error()
      }
    }

    void getTask()
  }, [])

  function connect (): void {
    socket.current = new WebSocket('ws://134.0.116.26:4442')

    socket.current.onopen = () => {
      setIsConnected(true)
      const message = { event: 'ready' }
      socket.current?.send(JSON.stringify(message))
    }

    socket.current.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data)

      switch (message.event) {
        case 'connect':
          break
        case 'pair':
          setIsOpponent(true)
          break
        case 'ready':
          break
        case 'pull':
          setOpponentCode(message.data)
          break
        case 'attempt':
          setOpponentAttempts(opponentAttempts => opponentAttempts + 1)
          break
        case 'lose':
          setGameMessage(`Вы проиграли, было ${attempts} попыток!`)
          setOpen(true)
          break
        case 'disconnect':
          setIsConnected(false)
          setIsOpponent(false)
          socket.current?.close()
          socket.current = null
          break
        default:
          break
      }
    }
  }

  const handleAttempt = async (): Promise<void> => {
    const message = { event: 'attempt' }
    socket.current?.send(JSON.stringify(message))
    setAttempts(attempts + 1)
  }

  const handleWin = async (): Promise<void> => {
    const message = { event: 'win' }
    socket.current?.send(JSON.stringify(message))
    setGameMessage(`Вы победили с ${attempts} попытки!`)
    setOpen(true)
  }

  const handleDisconnect = async (): Promise<void> => {
    const message = { event: 'decline' }
    socket.current?.send(JSON.stringify(message))

    setIsConnected(false)
    setIsOpponent(false)
    socket.current?.close()
    socket.current = null
    navigate('/tasks')
  }

  const isTimeOutLose = (): void => {
    setGameMessage(`Вы проиграли, было ${attempts} попыток!`)
    setOpen(true)
  }

  if (!isOpponent) {
    return (
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          height: '100vh'
        }}
      >
        <Button
          variant='contained'
          size='large'
          onClick={connect}
          disabled={isConnected}
        >
          Присоединиться
        </Button>
        <Button
          variant='contained'
          size='large'
          onClick={() => {
            navigate('/tasks')
          }}
        >
          Выйти
        </Button>
        {isConnected && <CircularProgress />}
        {isConnected && (
          <Typography component='div' variant='h6'>
            Ждем подключение второго пользователя
          </Typography>
        )}
      </Grid>
    )
  }

  return (
    <main className={cls.main}>
      <button
        className={cls.leaveRoomButton}
        type='button'
        onClick={() => {
          void handleDisconnect()
        }}
      >
        Выйти из комнаты
      </button>
      <div className={cls.container}>
        <h1 className={cls.mainTitle}>{taskData?.title}</h1>
        <div className={cls.descriptionContainer}>
          <p className={cls.description}>{taskData?.description}</p>
          <div className={cls.results}>
            <p className={cls.resultsText}>
              Вводимые значения: {taskData?.results[0][0]}
            </p>
            <p className={cls.resultsText}>
              Результат: {taskData?.results[0][1]}
            </p>
          </div>
        </div>
        <CodeEditor
          socket={socket}
          rightResult={rightResult}
          attempts={attempts}
          opponentCode={opponentCode}
          opponentAttempts={opponentAttempts}
          onAttempt={handleAttempt}
          onWin={handleWin}
          isTimeOutLose={isTimeOutLose}
        />
      </div>
    </main>
  )
}
