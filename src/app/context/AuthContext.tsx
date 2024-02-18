import { createContext } from 'react'
import { type AuthContextType } from 'shared/types'

/**
 * Контекст для управления состоянием аутентификации в приложении.
 * Используется для предоставления компонентам доступа к данным о состоянии аутентификации пользователя и методах управления аутентификацией.
 * Включает в себя данные о загрузке (isLoading), статусе аутентификации (isAuth), информации о пользователе (user),
 * а также функции для входа (login), получения данных пользователя (fetchUser) и выхода из системы (logout).
 *
 * @type {React.Context<AuthContextType>} Контекст с начальным состоянием аутентификации и методами управления.
 */
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
