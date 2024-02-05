import React, { type FC, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type ICreateTask } from 'entities/TaskApi/task.interface'
import taskService from 'entities/TaskApi/task.service'
import { Button } from 'shared/components'
import {
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'
import { errorToast } from 'shared/lib/error-toast'
import cls from './TaskPage.module.css'
import { Wrapper } from 'entities/Wrapper/Wrapper'
import { CodeEditors } from 'widgets/CodeEditors'
import { TotalModal } from 'widgets/TotalModal'
import { useModalState } from 'shared/hooks/useModalState'
import { motion } from 'framer-motion'

const initialOpponentCode = 'const task = () => {\n  //TO DO\n}'

export const TaskPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const socket = useRef<WebSocket | null>()

  const [isConnected, setIsConnected] = useState(false)
  const [isOpponent, setIsOpponent] = useState(false)
  const [opponentCode, setOpponentCode] = useState(initialOpponentCode)
  const [opponentAttempts, setOpponentAttempts] = useState(0)
  const [taskData, setTaskData] = useState<ICreateTask>()
  const [attempts, setAttempts] = useState(0)
  const [isOpponentReady, setIsOpponentReady] = useState(false)
  const [isOpen, openModal] = useModalState()
  const [isWin, setIsWin] = useState(false)
  const [isLose, setIsLose] = useState(false)

  useEffect(() => {
    const getTask = async (): Promise<void> => {
      try {
        const data = await taskService.getTaskById(id ?? '')
        setTaskData(data)
      } catch (error) {
        errorToast(error)
      }
    }

    void getTask()
  }, [])

  function connect (): void {
    socket.current = new WebSocket('ws://134.0.116.26:4442')

    socket.current.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data)

      switch (message.event) {
        case 'connect':
          setIsConnected(true)
          break
        case 'pair':
          setIsOpponent(true)
          break
        case 'ready':
          setIsOpponentReady(true)
          break
        case 'pull':
          setOpponentCode(message.data)
          break
        case 'attempt':
          setOpponentAttempts(opponentAttempts => opponentAttempts + 1)
          break
        case 'lose':
          setIsLose(true)
          openModal()
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

  const handleReady = (): void => {
    const message = { event: 'ready' }
    socket.current?.send(JSON.stringify(message))
  }

  const handleCode = (value: string): void => {
    const message = {
      event: 'push',
      data: value
    }
    socket.current?.send(JSON.stringify(message))
  }

  const handleAttempt = (): void => {
    const message = { event: 'attempt' }
    socket.current?.send(JSON.stringify(message))
    setAttempts(attempts + 1)
  }

  const handleWin = (): void => {
    const message = { event: 'win' }
    socket.current?.send(JSON.stringify(message))
    setIsWin(true)
    openModal()
  }

  const handleDecline = (): void => {
    const message = { event: 'decline' }
    socket.current?.send(JSON.stringify(message))

    setIsConnected(false)
    setIsOpponent(false)
    socket.current?.close()
    socket.current = null
    navigate('/tasks')
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
          gap: '10dvh',
          width: '100%',
          height: '68vh'
        }}
      >

        {isConnected && <CircularProgress />}
        {isConnected && (
          <Typography component='div' variant='h6'>
              Ждем подключение второго пользователя
          </Typography>
        )}
        <div className={cls.btnGroupConnect}>
          <Button
            text={'Присоединиться'}
            onClick={connect}
            disabled={isConnected}
            className={cls.btnConnect}
            isOrange
          />
          <Button
            text={'Выйти'}
            onClick={handleDecline}
          />
        </div>
      </Grid>
    )
  }

  return (
    <Wrapper>
      <Button
        className={cls.leaveRoomButton}
        type='button'
        isOrange={false}
        text='Выйти из комнаты'
        onClick={handleDecline}
      >
      </Button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className={cls.container}>
        <div className={cls.header}>
          <h1 className={cls.mainTitle}>{taskData?.title}</h1>
        </div>

        <CodeEditors
          isOpponentReady={isOpponentReady}
          onReady={handleReady}
          onCode={handleCode}
          taskData={taskData}
          rightResults={taskData?.results}
          attempts={attempts}
          opponentCode={opponentCode}
          opponentAttempts={opponentAttempts}
          onAttempt={handleAttempt}
          onWin={handleWin}
          isWin={isWin}
          isLose={isLose}
          setIsLose={setIsLose}
        />
      </motion.div>

      <TotalModal
        isOpen={isOpen}
        isWin={isWin}
        onDecline={handleDecline}
      />
    </Wrapper>
  )
}
