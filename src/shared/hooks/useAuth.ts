import { useState, useEffect } from 'react'
import api from '../service/axios/axiosClient'
import userService from 'entities/UserApi/user.service'

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
}

export function useAuth (): useAuthTypes {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState<User>({
    username: '',
    avatar: '',
    token: ''
  })

  useEffect(() => {
    fetchUser()
      .catch(error => {
        console.log(error)
      })
  }, [])

  async function fetchUser (): Promise<void> {
    try {
      const token = localStorage.getItem('access_token')
      const user = await userService.getUser()

      if (user.uuid !== '') {
        setIsAuth(true)
        setUser({ ...user, token: token ?? '' })
      }
    } catch (error) {
      console.log('auth error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, isAuth, user, fetchUser }
}
