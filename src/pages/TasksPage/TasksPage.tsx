import cls from './TasksPage.module.css'
import { SearchInput } from '../../shared/components/SearchInput/SearchInput'
import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../../entities/TaskApi/task.service'

interface Tasks {
  title: string
  description: string
}

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([])

  const handleSearch = useCallback((searchTerm: string) => {
    const filtered = tasks.filter(task => task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredTasks(filtered)
  }, [tasks])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskService.getTasks()
        setTasks(tasks)
        setFilteredTasks(tasks)
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }
    void fetchTasks()
  }, [])

  return (
      <div className={cls.main}>
        <h1 className={cls.title}>Таски</h1>
        <div className={cls.taskControlPanel}>
          <div className={cls.taskInteraction}>
            <Link to={'/'} className={cls.createTask}>Создать таску</Link>
            <SearchInput onSearch={handleSearch} />
          </div>

          <button className={cls.taskSortDate}>
            <p>по дате добавления</p>

          </button>
        </div>
        <div className={cls.tasks}>
          {filteredTasks.length > 0
            ? (
                filteredTasks.map(task => (
              <div className={cls.task} key={task.title} >
                <h1 className={cls.taskTitle}>{task.title}</h1>
                <div className={cls.taskOperations}>
                  <Link to={'/'} className={cls.taskEdit}>
                    Редактировать
                  </Link>
                  <Link to={'/'} className={cls.taskEnter}>
                    <img src='arrow-right.svg' alt='arrow' />
                  </Link>
                </div>
              </div>
                ))
              )
            : (
                <div className={cls.notFound}>
                  <img src='logo192.png' alt=''/>
                  <p>Not Found Tasks</p>
                </div>
              )}
        </div>
      </div>
  )
}
