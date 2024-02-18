export type ResultsType = string[][]

export interface IGetTaskById {
  description: string
  results: ResultsType
  title: string
  uuid: string
  createdAt: string
}

export type IGetTasks = IGetTaskById[]

export interface CreateTaskResponseType {
  inserted: IGetTasks
  omitted: IGetTasks
}

export interface ICreateTask {
  description: string
  results: ResultsType
  title: string
}

export interface TaskUpdateInput {
  description?: string
  results?: Array<[string, string]>
  title?: string
}

export interface IUpdateTask extends TaskUpdateInput {
  uuid: string
}

export interface IDeleteTask {
  uuid: string
}

export type CreateTaskType = ICreateTask | ICreateTask[]
