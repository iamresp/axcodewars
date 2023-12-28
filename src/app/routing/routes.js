import React from 'react'
import { AuthPage } from 'pages/AuthPage/AuthPage'
import { Navigate } from 'react-router-dom'
import { TaskPage } from 'pages/TaskPage/TaskPage'
import { TaskListPage } from 'pages/TasksPage/TaskListPage'
import { ProfilePage } from 'pages/ProfilePage/ProfilePage'
import { ProfileEditPage } from 'pages/ProfileEditPage'
import { ErrorPage } from 'pages/ErrorPage'
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
    element: <TaskListPage />
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
  {
    path: '/error',
    element: <ErrorPage />
  },
  { path: '*', element: <Navigate to='/error' replace /> }
]
