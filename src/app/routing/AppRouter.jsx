import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { publicRoutes, userRoutes } from './routes'
import { useAuth } from '../../shared/hooks/useAuth'
import { is } from 'date-fns/locale'

const AppRouter = () => {
  const { isAuth, authState } = useAuth()

  const navigate = useNavigate()

  const getRouts = () => {
    if (!isAuth) {
      return publicRoutes
    }

    return userRoutes
  }

  console.log(isAuth, 'isAuthRouter')

  return (
    <Routes>
      {getRouts().map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default AppRouter
