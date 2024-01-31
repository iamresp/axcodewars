export type ResultsType = string[][]

export interface IGetTaskById {
  description: string
  results: ResultsType
  title: string
  uuid: string
}

export type IGetTasks = IGetTaskById[]

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
