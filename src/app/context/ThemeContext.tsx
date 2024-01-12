import { createContext } from 'react'

interface ThemeContextType {
  currentTheme: string | null
  setCurrentTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: '',
  setCurrentTheme: (theme: string) => {}
})
