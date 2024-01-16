import { useState, useEffect, type SetStateAction, type Dispatch } from 'react'
import userService from 'entities/UserApi/user.service'
import { errorToast } from 'shared/lib/error-toast'

interface User {
  username: string
  avatar: string
  token: string
}

interface useAuthTypes {
  isLoading: boolean
  isAuth: boolean
  user: User
  fetchUser: () => Promise<void>
  setIsAuth: Dispatch<SetStateAction<boolean>>
}

export function useAuth (): useAuthTypes {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState<User>({
    username: '',
    avatar: '',
    token: ''
  })

  useEffect(() => {
    if (localStorage.getItem('access_token') != null) {
      setIsAuth(true)
    }

    if (isAuth) {
      void fetchUser()
    }
  }, [isAuth])

  async function fetchUser (): Promise<void> {
    setIsLoading(true)

    try {
      const token = localStorage.getItem('access_token')
      const user = await userService.getUser()

      if (user.uuid !== '') {
        setIsAuth(true)
        setUser({ ...user, token: token ?? '' })
      }
    } catch (error) {
      errorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, isAuth, user, setIsAuth, fetchUser }
}
