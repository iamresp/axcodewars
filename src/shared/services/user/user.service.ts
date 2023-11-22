import {
  ICreateUser,
  IAuthUser,
  IEditUser,
  IGetConnectUser,
} from "../../user.interface";

class UserService {
  private _URL = process.env.REACT_APP_SERVER_URL;
  private _token = localStorage.getItem("access_token");
  private _headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this._token}`,
  };

  async createUser(data: ICreateUser) {
    try {
      await fetch(`${this._URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      // Обработка ошибок
      console.error("Fetch error:", error);
    }
  }

  async authenticateUser(data: IAuthUser) {
    try {
      const response = await fetch(`${this._URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("access_token", responseData.access_token);
        this._token = responseData.access_token;
        window.location.reload();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      // Обработка ошибок
      console.error("Fetch error:", error);
    }
  }

  async getUser() {
    try {
      const response = await fetch(`${this._URL}/auth/user`, {
        method: "GET",
        headers: this._headers,
      });
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async editUser(data: IEditUser) {
    try {
      await fetch(`${this._URL}/auth/user`, {
        method: "GET",
        headers: this._headers,
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async getConnectUser(id: string): Promise<IGetConnectUser> {
    try {
      const response = await fetch(`${this._URL}/auth/user/${id}`, {
        method: "GET",
        headers: this._headers,
      });
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
}

const userService = new UserService();

export default userService;
