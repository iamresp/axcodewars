import { FIELD_LOCAL_STORAGE } from 'shared/constants'
import {
  type ICreateUser,
  type IAuthUser,
  type IEditUser,
  type IGetConnectUser,
  type IGetUser
} from './user.interface'
import { serviceStatus } from 'entities/service-status'

/**
 * Сервис для работы с пользователями. Позволяет создавать пользователя, аутентифицировать,
 * получать информацию о пользователе, редактировать данные пользователя и получать данные о подключённом пользователе.
 */
class UserService {
  private readonly _URL = process.env.REACT_APP_SERVER_URL
  private _token = localStorage.getItem(FIELD_LOCAL_STORAGE.ACCESS_TOKEN)
  private readonly _headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._token}`
  }

  private readonly _status = { ...serviceStatus }

  /**
   * Создает нового пользователя.
   * @param {FormData} data Данные пользователя.
   * @return {Promise<void>} Промис без возвращаемого значения, сигнализирующий об успешном создании пользователя.
   */
  async createUser (data: FormData): Promise<void> {
    try {
      const response = await fetch(`${this._URL}/user`, {
        method: 'POST',
        body: data
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

  /**
   * Аутентифицирует пользователя.
   * @param {IAuthUser} data Данные для аутентификации пользователя.
   * @return {Promise<void>} Промис без возвращаемого значения, сигнализирующий об успешной аутентификации.
   */
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

      this._token = responseData[FIELD_LOCAL_STORAGE.ACCESS_TOKEN]
      this._headers.Authorization = `Bearer ${this._token}`
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  /**
   * Получает информацию о текущем пользователе.
   * @return {Promise<IGetUser>} Промис с объектом данных пользователя.
   */
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

  /**
   * Редактирует данные пользователя.
   * @param {FormData} data Обновленные данные пользователя.
   * @return {Promise<void>} Промис без возвращаемого значения, сигнализирующий об успешном обновлении данных пользователя.
   */
  async editUser (data: FormData): Promise<void> {
    try {
      const response = await fetch(`${this._URL}/auth/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this._token}`
        },
        body: data
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

  /**
   * Получает данные о подключении другого пользователя.
   * @param {string} id Идентификатор пользователя, данные о подключении которого требуется получить.
   * @return {Promise<IGetConnectUser>} Промис с объектом данных о подключении пользователя.
   */
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
