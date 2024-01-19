import React, { type FC } from 'react'
import { publicRoutes, userRoutes } from './routes'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from 'shared/hooks/useAuth'

const AppRouter: FC = () => {
  const { isAuth } = useAuth()

  const getRoutes = () => {
    if (!isAuth) {
      return publicRoutes
    }

    return userRoutes
  }

  return (
    <Routes>
      {getRoutes().map(route => (
        <Route path={route.path} element={route.element} key={route.path}/>
      ))}
    </Routes>
  )
}

export default AppRouter
