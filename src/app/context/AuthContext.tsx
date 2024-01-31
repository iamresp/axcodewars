import { createContext } from 'react'
import { type AuthContextType } from 'shared/types'

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  isAuth: false,
  user: {
    username: '',
    avatar: '',
    token: ''
  },
  login: async () => {},
  fetchUser: async () => {},
  logout: () => {}
})
