import React, { useState, type FC } from 'react'
import { ThemeContext } from './ThemeContext'

const defaultTheme = localStorage.getItem('theme')

interface ThemeProviderProps {
  children: JSX.Element
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string | null>(defaultTheme)

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
