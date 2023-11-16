export class TaskService {
  static async createTask(taskData: {
    description: string;
    results: [string, string][];
    title: string;
  }): Promise<{
    description: string;
    results: [string, string][];
    title: string;
    uuid: string;
  }> {
    try {
      const response = await fetch("http://134.0.116.26:5553/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Не удалось создать задачу");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
      throw error;
    }
  }

  static async getTasks(): Promise<
    Array<{
      description: string;
      results: [string, string][];
      title: string;
      uuid: string;
    }>
  > {
    try {
      const response = await fetch("http://134.0.116.26:5553/api/tasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${document.cookie}`,
        },
      });

      if (!response.ok) {
        throw new Error("Не удалось получить список задач");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка получения списка задач:", error);
      throw error;
    }
  }
}
