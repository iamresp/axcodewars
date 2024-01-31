import React, {
  type FC, type ReactNode,
  useEffect, useState
} from 'react'
import { AuthContext } from 'app/context/AuthContext'
import { FIELD_LOCAL_STORAGE } from 'shared/constants'
import userService from 'entities/UserApi/user.service'
import { errorToast } from 'shared/lib/error-toast'
import { type UserType } from 'shared/types'

interface AuthContextProps {
  children: ReactNode
}
export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const token = localStorage.getItem(FIELD_LOCAL_STORAGE.ACCESS_TOKEN)

  const [isLoading, setIsLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(Boolean(token))
  const [user, setUser] = useState<UserType>({
    username: '',
    avatar: '',
    token: ''
  })

  async function login (hash: string, username: string): Promise<void> {
    try {
      await userService.authenticateUser({ hash, username })
      setIsAuth(true)
    } catch (error) {
      errorToast(error)
    }
  }

  const logout = (): void => {
    localStorage.removeItem(FIELD_LOCAL_STORAGE.ACCESS_TOKEN)
    setIsAuth(false)
    setUser({
      username: '',
      avatar: '',
      token: ''
    })
  }

  async function fetchUser (): Promise<void> {
    setIsLoading(true)

    try {
      const user = await userService.getUser()

      if (user.uuid !== '') {
        setUser({ ...user, token: token ?? '' })
      }
    } catch (error) {
      errorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token != null) {
      setIsAuth(true)
    }

    if (isAuth) {
      void fetchUser()
    }
  }, [isAuth])

  return (
    <AuthContext.Provider value={{
      isLoading,
      isAuth,
      user,
      fetchUser,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
