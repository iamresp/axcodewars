import { FIELD_LOCAL_STORAGE } from 'shared/constants/constants'
import {
  type ICreateUser,
  type IAuthUser,
  type IEditUser,
  type IGetConnectUser,
  type IGetUser
} from './user.interface'
import { serviceStatus } from 'entities/service-status'

class UserService {
  private readonly _URL = process.env.REACT_APP_SERVER_URL
  private _token = localStorage.getItem(FIELD_LOCAL_STORAGE.ACCESS_TOKEN)
  private readonly _headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._token}`
  }

  private readonly _status = { ...serviceStatus }

  async createUser (data: ICreateUser): Promise<void> {
    try {
      const response = await fetch(`${this._URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(
          this._status[response.status]
        )
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async authenticateUser (data: IAuthUser): Promise<void> {
    try {
      const response = await fetch(`${this._URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error(
          this._status[response.status]
        )
      }

      const responseData: { [FIELD_LOCAL_STORAGE.ACCESS_TOKEN]: string } =
          await response.json()

      localStorage.setItem(
        FIELD_LOCAL_STORAGE.ACCESS_TOKEN,
        responseData[FIELD_LOCAL_STORAGE.ACCESS_TOKEN]
      )

      this._token = responseData.access_token

      window.location.reload()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getUser (): Promise<IGetUser> {
    try {
      const response = await fetch(`${this._URL}/auth/user`, {
        method: 'GET',
        headers: this._headers
      })

      if (!response.ok) {
        throw new Error(
          this._status[response.status]
        )
      }

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async editUser(data: IEditUser) {
    try {
      const response = await fetch(`${this._URL}/auth/user`, {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(
          this._status[response.status]
        )
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getConnectUser (id: string): Promise<IGetConnectUser> {
    try {
      const response = await fetch(`${this._URL}/auth/user/${id}`, {
        method: 'GET',
        headers: this._headers
      })

      if (!response.ok) {
        throw new Error(
          this._status[response.status]
        )
      }

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const userService = new UserService()

export default userService
