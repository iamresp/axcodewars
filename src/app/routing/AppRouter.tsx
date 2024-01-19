import React, { type FC } from 'react'
import { publicRoutes, userRoutes } from './routes'
import { Route, Routes, type RouteProps } from 'react-router-dom'
import { Loading } from 'shared/components/Loading'
import { useAuth } from 'shared/hooks/useAuth'

const AppRouter: FC = () => {
  const { isLoading, isAuth } = useAuth()

  const getRouts = (): RouteProps[] => {
    if (!isAuth) {
      return publicRoutes
    } else {
      return userRoutes
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Routes>
      {getRouts().map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default AppRouter
