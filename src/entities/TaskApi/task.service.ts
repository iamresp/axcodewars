import { FIELD_LOCAL_STORAGE } from 'shared/constants'
import {
  type CreateTaskResponseType,
  type IGetTaskById,
  type IGetTasks,
  type TaskUpdateInput,
  type CreateTaskType
} from './task.interface'
import { serviceStatus } from 'entities/service-status'

/**
 * Сервис для работы с тасками. Позволяет создавать, получать, обновлять и удалять таски через API.
 */
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

  /**
   * Получает список задач с сервера.
   * @param {string} sortField Поле для сортировки.
   * @param {string} sortOrder Порядок сортировки.
   * @param {number} page Номер страницы.
   * @param {number} size Количество задач на странице.
   * @return {Promise<IGetTasks>} Промис с объектом списка задач.
   */
  async getTasks (sortField: string = 'createdAt', sortOrder: string = 'ASC', page: number = 1, size: number = 10): Promise<IGetTasks> {
    try {
      const response = await fetch(`${this._URL}/tasks?sort=${sortField}&order=${sortOrder}&page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            FIELD_LOCAL_STORAGE.ACCESS_TOKEN
          )}`
        }
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
   * Создает новую задачу.
   * @param {CreateTaskType} body Объект с данными для создания задачи.
   * @return {Promise<CreateTaskResponseType>} Промис с объектом созданной задачи.
   */
  async createTask (body: CreateTaskType): Promise<CreateTaskResponseType> {
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

  /**
   * Получает задачу по идентификатору.
   * @param {string} id Идентификатор задачи.
   * @return {Promise<IGetTaskById>} Промис с объектом задачи.
   */
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

  /**
   * Обновляет задачу.
   * @param {string} taskUuid Уникальный идентификатор задачи.
   * @param {TaskUpdateInput} body Объект с обновленными данными задачи.
   * @return {Promise<IGetTaskById>} Промис с объектом обновленной задачи.
   */
  async updateTask (taskUuid: string, body: TaskUpdateInput): Promise<IGetTaskById> {
    try {
      const response = await fetch(`${this._URL}/tasks/${taskUuid}`, {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        throw new Error(this._status[response.status])
      }

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  /**
   * Удаляет задачу по идентификатору.
   * @param {string} taskUuid Уникальный идентификатор задачи.
   * @return {Promise<boolean>} Промис, который возвращает true, если задача успешно удалена.
   */
  async deleteTask (taskUuid: string): Promise<boolean> {
    try {
      const response = await fetch(`${this._URL}/tasks/${taskUuid}`, {
        method: 'DELETE',
        headers: this._headers
      })

      if (!response.ok) {
        throw new Error(this._status[response.status])
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
