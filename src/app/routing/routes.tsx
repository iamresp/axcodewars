import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { Loading } from 'shared/components/Loading'

export interface RoutesType {
  path: string
  element: JSX.Element
}

const AuthPage = React.lazy(async () => await import('pages/AuthPage')
  .then(module => ({
    default: module.AuthPage
  }))
)
const ProfilePage = React.lazy(async () => await import('pages/ProfilePage')
  .then(module => ({
    default: module.ProfilePage
  }))
)
const ProfileEditPage = React.lazy(async () => await import('pages/ProfileEditPage')
  .then(module => ({
    default: module.ProfileEditPage
  }))
)
const TaskListPage = React.lazy(async () => await import('pages/TaskListPage')
  .then(module => ({
    default: module.TaskListPage
  }))
)
const TaskPage = React.lazy(async () => await import('pages/TaskPage')
  .then(module => ({
    default: module.TaskPage
  }))
)
const ErrorPage = React.lazy(async () => await import('pages/ErrorPage')
  .then(module => ({
    default: module.ErrorPage
  }))
)

export const publicRoutes: RoutesType[] = [
  {
    path: '/auth',
    element: (
      <Suspense fallback={<div>Загрузка...</div>}>
        <AuthPage />
      </Suspense>
    )
  },
  { path: '*', element: <Navigate to='/auth' replace /> }
]
export const userRoutes = [
  {
    path: '/tasks',
    element: (
      <Suspense fallback={<Loading />}>
        <TaskListPage />
      </Suspense>
    )
  },
  {
    path: '/tasks/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <TaskPage />
      </Suspense>
    )
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<Loading />}>
        <ProfilePage />
      </Suspense>
    )
  },
  {
    path: '/profile/edit',
    element: (
      <Suspense fallback={<Loading />}>
        <ProfileEditPage />
      </Suspense>
    )
  },
  {
    path: '/error',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    )
  },
  { path: '*', element: <Navigate to='/tasks' replace /> }
]
