import React, { type FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchInput, Loading } from 'shared/components'
import taskService from 'entities/TaskApi/task.service'
import { useModalState } from 'shared/hooks/useModalState'
import { CreateTaskModal, EditTaskModal } from 'widgets/TaskModal'
import { CSVModal } from 'widgets/CSVModal'
import { type IGetTaskById } from 'entities/TaskApi/task.interface'
import cls from './TaskListPage.module.css'
import { Wrapper } from 'entities/Wrapper'
import ArrowRight from 'shared/images/arrow-right.svg'
import { errorToast } from 'shared/lib/error-toast'
import NotFound from 'shared/images/logo192.png'
import { motion } from 'framer-motion'

export const TaskListPage: FC = () => {
  const [tasks, setTasks] = useState<IGetTaskById[]>([])
  const [filteredTasks, setFilteredTasks] = useState<IGetTaskById[]>([])
  const [getId, setGetId] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [isCreateOpen, openCreateModal, closeCreateModal] = useModalState()
  const [isEditOpen, openEditModal, closeEditModal] = useModalState()
  const [isCSVOpen, openCSVModal, closeCSVModal] = useModalState()

  const [sortOrder, setSortOrder] = useState('ASC')

  const handleSort = (): void => {
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (sortOrder === 'ASC') {
        return a.createdAt > b.createdAt ? 1 : -1
      } else {
        return a.createdAt < b.createdAt ? 1 : -1
      }
    })
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
    setFilteredTasks(sortedTasks)
  }

  const handleCreateOpen = (): void => {
    openCreateModal()
  }

  const handleEditOpen = (id: string): void => {
    openEditModal()
    setGetId(id)
  }

  const handleCSVOpen = (): void => {
    openCSVModal()
    closeCreateModal()
  }

  const handleSearch = useCallback(
    (searchTerm: string) => {
      const filtered = tasks.filter(
        task => task.title?.length > 0 &&
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredTasks(filtered)
    },
    [tasks]
  )

  const fetchTasks = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const tasks = await taskService.getTasks({
        sortField: 'createdAt',
        sortOrder: 'ASC',
        pageNumber: 1,
        pageSize: 10,
        search: '',
        tag: ''
      })
      setTasks(tasks)
      setFilteredTasks(tasks)
    } catch (error) {
      errorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchTasks()
  }, [])

  return (
    <Wrapper>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className={cls.title}>Таски</motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className={cls.taskControlPanel}>
        <div className={cls.taskInteraction}>
          <button
            type='button'
            onClick={handleCreateOpen}
            className={cls.createTask}
          >
            Создать таску
          </button>
          <SearchInput onSearch={handleSearch} />
        </div>
        <button type='button' onClick={handleSort} className={cls.taskSortDate}>
          <p>по дате добавления</p>
        </button>
      </motion.div>
      <div className={cls.tasks}>
        {isLoading
          ? (
            <Loading />
          )
          : filteredTasks.length > 0
            ? (filteredTasks.map((task, i) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 * i + 0.2,
                  ease: 'linear'
                }}
                className={cls.task} key={task.title + i}>
                <h1 className={cls.taskTitle}>{task.title}</h1>
                <div className={cls.taskOperations}>
                  <button
                    type='button'
                    className={cls.taskEdit}
                    onClick={() => {
                      handleEditOpen(task.uuid)
                    }}
                  >
                    Редактировать
                  </button>
                  <Link to={`/tasks/${task.uuid}`} className={cls.taskEnter}>
                    <ArrowRight/>
                  </Link>
                </div>
              </motion.div>
            ))
            )
            : (
              <div className={cls.notFound}>
                <img src={NotFound} alt='not-found'/>
                <p>Not Found Tasks</p>
              </div>
            )}
      </div>
      <CreateTaskModal
        isOpen={isCreateOpen}
        close={closeCreateModal}
        openCSV={handleCSVOpen}
        getTasks={fetchTasks}
      />
      <EditTaskModal
        isOpen={isEditOpen}
        close={closeEditModal}
        id={getId}
        getTasks={fetchTasks}
      />
      <CSVModal
        isOpen={isCSVOpen}
        close={closeCSVModal}
        getTasks={fetchTasks}
      />
    </Wrapper>
  )
}
