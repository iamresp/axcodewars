import { ICreateTask, IGetTaskById, IGetTasks } from './task.interface';

class TaskService {
  private _URL = process.env.REACT_APP_SERVER_URL;
  private _token = localStorage.getItem('access_token');
  private _headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._token}`
  };

  private isLoading = true;

  async getTasks(): Promise<IGetTasks> {
    try {
      const response = await fetch(`${this._URL}/tasks`, {
        method: 'GET',
        headers: this._headers
      });
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    } finally {
      this.isLoading = false;
      // return { data: response.json(), isLoading: this.isLoading };
    }
  }

  async createTask(body: ICreateTask) {
    try {
      const response = await fetch(`${this._URL}/tasks`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(body)
      });
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      window.location.reload();
      // return { data: response.json(), isLoading: this.isLoading };
    }
  }

  async getTaskById(id: string): Promise<IGetTaskById> {
    try {
      const response = await fetch(`${this._URL}/tasks/${id}`, {
        method: 'GET',
        headers: this._headers
      });
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
      // return { data: response.json(), isLoading: this.isLoading };
    }
  }
}

const taskService = new TaskService();

export default taskService;
