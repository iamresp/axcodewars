export enum TASK {
  DESCRIPTION = 'description',
  TASK_CASE = 'taskCase',
  TITLE = 'title'
}

export interface TaskCaseTypes {
  args: string
  result: string
}

export interface TaskObjTypes {
  [TASK.DESCRIPTION]: string
  [TASK.TASK_CASE]: TaskCaseTypes[]
  [TASK.TITLE]: string
}

export const TASK_OBJ = {
  [TASK.DESCRIPTION]: '',
  [TASK.TASK_CASE]: [{ args: '', result: '' }],
  [TASK.TITLE]: ''
}

export const STORAGE = 'create_task'
