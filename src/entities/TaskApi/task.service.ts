import { FIELD_LOCAL_STORAGE } from 'shared/constants/constants'
import {
  type ICreateTask,
  type IGetTaskById,
  type IGetTasks
} from './task.interface'
import { serviceStatus } from 'entities/service-status'

class TaskService {
  private readonly _URL = process.env.REACT_APP_SERVER_URL
  private readonly _token = localStorage.getItem(
    FIELD_LOCAL_STORAGE.ACCESS_TOKEN
  )

  private readonly _headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._token}`
  }

  private readonly _status = { ...serviceStatus }

  async getTasks (): Promise<IGetTasks> {
    try {
      const response = await fetch(`${this._URL}/tasks`, {
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

  async createTask (body: ICreateTask): Promise<void> {
    try {
      const res = await fetch(`${this._URL}/tasks`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        throw new Error(
          this._status[res.status]
        )
      }

      return await res.json()
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  async getTaskById (id: string): Promise<IGetTaskById> {
    try {
      const response = await fetch(`${this._URL}/tasks/${id}`, {
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

const taskService = new TaskService()

export default taskService
