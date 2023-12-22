import React, { type FC, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { SearchInput } from '../../shared/components/SearchInput/SearchInput'
import taskService from '../../entities/TaskApi/task.service'
import { useModalState } from 'shared/hooks/useModalState'
import { CreateTaskModal, EditTaskModal } from 'widgets/TaskModal'
import { CSVModal } from 'widgets/CSVModal'
import { type IGetTaskById } from 'entities/TaskApi/task.interface'
import cls from './TaskListPage.module.css'

export const TaskListPage: FC = () => {
  const [tasks, setTasks] = useState<IGetTaskById[]>([])
  const [filteredTasks, setFilteredTasks] = useState<IGetTaskById[]>([])
  const [getId, setGetId] = useState('')

  const [isCreateOpen, openCreateModal, closeCreateModal] = useModalState()
  const [isEditOpen, openEditModal, closeEditModal] = useModalState()
  const [isCSVOpen, openCSVModal, closeCSVModal] = useModalState()

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
    try {
      const tasks = await taskService.getTasks()
      setTasks(tasks)
      setFilteredTasks(tasks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    void fetchTasks()
  }, [])

  return (
    <div className={cls.main}>
      <h1 className={cls.title}>Таски</h1>
      <div className={cls.taskControlPanel}>
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

        <button type='button' className={cls.taskSortDate}>
          <p>по дате добавления</p>
        </button>
      </div>
      <div className={cls.tasks}>
        {filteredTasks.length > 0
          ? (
            filteredTasks.map(task => (
              <div className={cls.task} key={task.title}>
                <h2 className={cls.taskTitle}>{task.title}</h2>
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
                  <Link to={'/'} className={cls.taskEnter}>
                    <img src='arrow-right.svg' alt='arrow' />
                  </Link>
                </div>
              </div>
            ))
          )
          : (
            <div className={cls.notFound}>
              <img src='logo192.png' alt='loading' />
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
    </div>
  )
}
