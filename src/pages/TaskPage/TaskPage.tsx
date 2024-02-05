import React, { type FC, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type ICreateTask } from 'entities/TaskApi/task.interface'
import taskService from 'entities/TaskApi/task.service'
import { Button } from 'shared/components'
import { errorToast } from 'shared/lib/error-toast'
import cls from './TaskPage.module.css'
import { Wrapper } from 'entities/Wrapper/Wrapper'
import { CodeEditors } from 'widgets/CodeEditors'
import { type IGetConnectUser } from 'entities/UserApi/user.interface'
import userService from 'entities/UserApi/user.service'
import { TotalModal } from 'widgets/TotalModal'
import { useModalState } from 'shared/hooks/useModalState'
import { motion, MotionConfig } from 'framer-motion'
import { Connection } from 'widgets/Connection'
import { ThemeContext } from 'app/context/ThemeContext'
import { transition } from 'widgets/Connection/constants'
import { Scene } from 'widgets/Connection/ui/Canvas'

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

  const [open, setOpen] = useState(false)
  const [gameMessage, setGameMessage] = useState('')

  const [isOpen, openModal, closeModal] = useModalState()
  const [isWin, setIsWin] = useState(false)

  const [isOn, setOn] = useState(false)
  const [timer, setTimer] = useState(0)
  const { currentTheme } = useContext(ThemeContext)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isOn) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    } else if (!isOn && timer !== 0) {
      setTimer(0)
      if (interval !== null && interval !== undefined) {
        clearInterval(interval)
      }
    }

    return () => {
      if (interval !== null && interval !== undefined) {
        clearInterval(interval)
      }
    }
  }, [isOn, timer])

  const toggleTimer = () => {
    setOn(!isOn)
  }

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
          setIsWin(false)
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

  const handleDisconnect = (): void => {
    const message = { event: 'decline' }
    socket.current?.send(JSON.stringify(message))

    setIsConnected(false)
    setIsOpponent(false)
    socket.current?.close()
    socket.current = null
    navigate('/tasks')
  }

  const isTimeOutLose = (): void => {
    openModal()
  }

  if (!isOpponent) {
    return (
      <MotionConfig transition={transition}>
        <motion.div className={cls.main}>
          <motion.div
            className={cls.containerConnect}
            initial={false}
            animate={{
              backgroundColor: currentTheme === 'light' ? 'white' : 'black',
              color: '#F37022'
            }}
          >
            <h4 className={cls.open}>{isOn ? 'Поиск' : 'Перекати'}</h4>
            <h4 className={cls.close}>{isOn ? 'игрока' : 'шарик'}</h4>
            <motion.h4>{timer}</motion.h4>
            <Scene isOn={isOn} setOn={setOn} connect={connect} />
          </motion.div>
        </motion.div>
      </MotionConfig>
    )
  }

  return (
    <Wrapper>
      <Button
        className={cls.leaveRoomButton}
        type='button'
        isOrange={false}
        text='Выйти из комнаты'
        onClick={() => {
          handleDisconnect()
        }}
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
        <CodeEditors
          socket={socket}
          rightResults={taskData?.results}
          attempts={attempts}
          opponentCode={opponentCode}
          opponentAttempts={opponentAttempts}
          onAttempt={handleAttempt}
          onWin={handleWin}
          isTimeOutLose={isTimeOutLose}
        />
      </motion.div>

      <TotalModal
        isOpen={isOpen}
        isWin={isWin}
      />
    </Wrapper>
  )
}
