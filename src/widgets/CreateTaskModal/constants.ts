export enum CREATE_TASK {
  DESCRIPTION = 'description',
  TASK_CASE = 'taskCase',
  TITLE = 'title'
}

export interface TaskCaseTypes {
  args: string
  result: string
}

export interface CreateTaskObjTypes {
  [CREATE_TASK.DESCRIPTION]: string
  [CREATE_TASK.TASK_CASE]: TaskCaseTypes[]
  [CREATE_TASK.TITLE]: string
}

export const CREATE_TASK_OBJ = {
  [CREATE_TASK.DESCRIPTION]: '',
  [CREATE_TASK.TASK_CASE]: [{ args: '', result: '' }],
  [CREATE_TASK.TITLE]: ''
}

export const STORAGE = 'create_task'
