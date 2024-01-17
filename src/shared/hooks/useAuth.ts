import { useContext } from 'react'
import { AuthContext } from 'app/context/AuthContext'
import { type AuthContextType } from 'shared/types'

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}
