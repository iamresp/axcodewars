import React, { useContext, useState } from 'react'
import { AuthContext } from 'app/context/AuthContext'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Using the useState hook to keep track of the value authed (if a
  // user is logged in)
  const [authed, setAuthed] = useState<boolean>(false)

  const login = async (): Promise<void> => {
    const result = await fakeAsyncLogin()

    if (result) {
      console.log('user has logged in')

      setAuthed(true)
    }
  }

  /// Mock Async Login API call.
  const fakeAsyncLogin = async (): Promise<string> => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Logged In')
      }, 300)
    })
  }

  return (
  // Using the provider so that ANY component in our application can
  // use the values that we are sending.
    <AuthContext.Provider value={{ isAuth: authed, setAuthed, login }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  return useContext(AuthContext)
}
