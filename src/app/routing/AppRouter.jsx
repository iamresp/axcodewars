import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { publicRoutes, userRoutes } from './routes'
import { useAuth } from 'shared/hooks/useAuth'

const AppRouter = () => {
  const { isAuth } = useAuth()

  const getRouts = () => {
    if (!isAuth) {
      return publicRoutes
    }

    return userRoutes
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
