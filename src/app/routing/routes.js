
import { AuthPage } from '../../pages/AuthPage/AuthPage'
import { Navigate } from 'react-router-dom'
import { TaskPage } from '../../pages/TaskPage/TaskPage'
import { TasksPage } from '../../pages/TasksPage/TasksPage'
import React from 'react'
window.React = React


export const publicRoutes = [
  {
    path: '/auth',
    element: <AuthPage />
  },
  { path: '*', element: <Navigate to='/auth' replace /> }
]

export const userRoutes = [
  {
    path: '/tasks',
    element: <TasksPage />
  },
  {
    path: '/tasks/:id',
    element: <TaskPage />
  },
  { path: '*', element: <Navigate to='/tasks' replace /> }
]
