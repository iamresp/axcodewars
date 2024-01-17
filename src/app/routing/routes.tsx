import React from 'react'
import { AuthPage } from 'pages/AuthPage'
import { Navigate } from 'react-router-dom'
import { ProfilePage } from 'pages/ProfilePage'
import { ProfileEditPage } from 'pages/ProfileEditPage'
import { ErrorPage } from 'pages/ErrorPage'
import { TaskListPage } from 'pages/TasksPage'
import { TaskPage } from 'pages/TaskPage'
window.React = React

export interface RoutesType {
  path: string
  element: JSX.Element
}

export const publicRoutes: RoutesType[] = [
  {
    path: '/auth',
    element: <AuthPage />
  },
  { path: '*', element: <Navigate to='/auth' replace /> }
]

export const userRoutes: RoutesType[] = [
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
  { path: '*', element: <Navigate to='/tasks' replace /> }
]
