import { useState, useEffect, type SetStateAction, type Dispatch } from 'react'
import userService from 'entities/UserApi/user.service'
import { errorToast } from 'shared/lib/error-toast'
import { FIELD_LOCAL_STORAGE } from 'shared/constants/constants'

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
  authState: (bool: boolean) => void
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
      console.log('sas')
    }

    if (isAuth) {
      void fetchUser()
    }
  }, [isAuth])

  const token = localStorage.getItem(FIELD_LOCAL_STORAGE.ACCESS_TOKEN)

  const authState = (bool: boolean): void => {
    setIsAuth(bool)
  }

  async function fetchUser (): Promise<void> {
    setIsLoading(true)

    try {
      const token = localStorage.getItem('access_token')
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

  console.log(isAuth, 'isAuthUse')

  return { isLoading, isAuth, user, authState, fetchUser }
}
