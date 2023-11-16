import {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from "./interfaces";

export class AuthService {
  static async login({
    username,
    password,
  }: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch("http://134.0.116.26:5553/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hash: password,
          username: username,
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось выполнить вход");
      }

      const data = await response.json();
      document.cookie = data.access_token;
      return { accessToken: data.access_token };
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error;
    }
  }

  static async register({
    avatar,
    hash, // Используем поле hash вместо password
    username,
  }: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await fetch("http://134.0.116.26:5553/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar,
          hash, // Обновляем поле hash
          username,
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось создать пользователя");
      }

      const data = await response.json();
      return { uuid: data.uuid };
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      throw error;
    }
  }
}

// const loginRequest: LoginRequest = {
//     username: " ",
//     password: " ",
//   };

//   const registerRequest: RegisterRequest = {
//     avatar: " ",
//     hash: " ",
//     username: " ",
//   };

//   // Вызов метода login
//   AuthService.login(loginRequest)
//     .then((loginResponse: LoginResponse) => {
//       console.log("Успешный вход. Токен доступа:", loginResponse.accessToken);
//     })
//     .catch((loginError) => {
//       console.error("Ошибка входа:", loginError.message);
//     });

//   // Вызов метода register
//   AuthService.register(registerRequest)
//     .then((registerResponse: RegisterResponse) => {
//       console.log("Пользователь успешно зарегистрирован. UUID:", registerResponse.uuid);
//     })
//     .catch((registerError) => {
//       console.error("Ошибка регистрации:", registerError.message);
//     });
