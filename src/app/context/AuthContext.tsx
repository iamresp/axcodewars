// /src/hooks/useAuth.tsx
import type React from 'react'
import { useState, createContext, useContext, useEffect } from 'react'

interface AuthContextType {
  isAuth: boolean
  setAuthed: React.Dispatch<React.SetStateAction<boolean>>
  login: () => Promise<void>
}
// Create the context
export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setAuthed: () => {},
  login: async () => {
    await Promise.resolve()
  }
})

// Finally creating the custom hook
export const useAuth = () => useContext(AuthContext)
