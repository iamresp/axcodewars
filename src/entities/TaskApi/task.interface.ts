export type ResultsType = string[][]

export interface IGetTaskById {
  description: string
  results: ResultsType
  title: string
  uuid: string
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

export type CreateTaskType = ICreateTask | ICreateTask[]
