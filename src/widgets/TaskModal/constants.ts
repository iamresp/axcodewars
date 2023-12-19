export interface TaskCaseTypes {
  args: string
  result: string
}

export interface TaskObjTypes {
  description: string
  taskCase: TaskCaseTypes[]
  title: string
}

export const taskObj: TaskObjTypes = {
  description: '',
  taskCase: [{ args: '', result: '' }],
  title: ''
}

export const STORAGE = 'create_task'
