import React, { type FC } from 'react'
import { Route, type RouteProps, Routes } from 'react-router-dom'
import { publicRoutes, userRoutes } from './routes'
import { useAuth } from 'shared/hooks/useAuth'

const AppRouter: FC = () => {
  const { isAuth } = useAuth()

  const getRoutes = (): RouteProps[] => {
    if (!isAuth) {
      return publicRoutes
    }

    return userRoutes
  }

  return (
    <Routes>
      {getRoutes().map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default AppRouter
