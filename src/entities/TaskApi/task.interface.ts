export interface IGetTaskById {
  description: string;
  results: [string, string][];
  title: string;
  uuid: string;
}

export type IGetTasks = IGetTaskById[];

export interface ICreateTask {
  description: string;
  results: [string, string][];
  title: string;
}
