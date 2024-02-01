export interface UserType {
  username: string
  avatar: string
  token: string
}
export interface AuthContextType {
  isLoading: boolean
  isAuth: boolean
  user: UserType
  fetchUser: () => Promise<void>
  login: (hash: string, username: string) => Promise<void>
  logout: () => void
}
