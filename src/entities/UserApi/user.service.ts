import { FIELD_LOCAL_STORAGE } from 'shared/constants/constants'
import {
  type ICreateUser,
  type IAuthUser,
  type IEditUser,
  type IGetConnectUser
} from './user.interface'

class UserService {
  private readonly _URL = process.env.REACT_APP_SERVER_URL

  private _token = localStorage.getItem(FIELD_LOCAL_STORAGE.ACCESS_TOKEN)

  private readonly _headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._token}`
  }

  async createUser(data: ICreateUser) {
    try {
      await fetch(`${this._URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  async authenticateUser(data: IAuthUser) {
    try {
      const response = await fetch(`${this._URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        const responseData = await response.json()
        localStorage.setItem('access_token', responseData.access_token)
        this._token = responseData.access_token
        window.location.reload()
      } else {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  async getUser() {
    try {
      const response = await fetch(`${this._URL}/auth/user`, {
        method: 'GET',
        headers: this._headers
      })

      return await response.json()
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  async editUser(data: IEditUser) {
    try {
      await fetch(`${this._URL}/auth/user`, {
        method: 'GET',
        headers: this._headers,
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  async getConnectUser(id: string): Promise<IGetConnectUser> {
    try {
      const response = await fetch(`${this._URL}/auth/user/${id}`, {
        method: 'GET',
        headers: this._headers
      })

      return await response.json()
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }
}

const userService = new UserService()

export default userService
