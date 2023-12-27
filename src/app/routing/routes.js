import React from 'react'
import { AuthPage } from '../../pages/AuthPage/AuthPage'
import { Navigate } from 'react-router-dom'
import { TaskPage } from '../../pages/TaskPage/TaskPage'
import { TasksPage } from '../../pages/TasksPage/TasksPage'
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage'
import { ProfileEditPage } from '../../pages/ProfileEditPage'
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
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/profile/edit',
    element: <ProfileEditPage />
  },
  { path: '*', element: <Navigate to='/tasks' replace /> }
]
