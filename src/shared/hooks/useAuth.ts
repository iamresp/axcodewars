import { useContext } from 'react'
import { AuthContext } from 'app/context/AuthContext'
import { type AuthContextType } from 'shared/types'

/**
 * Кастомный хук для доступа к контексту аутентификации.
 * Позволяет компонентам React получать состояние аутентификации и методы для управления аутентификацией пользователя,
 * такие как login, logout и fetchUser.
 *
 * @return {AuthContextType} Возвращает текущее состояние аутентификации и методы управления аутентификацией.
 */
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}
