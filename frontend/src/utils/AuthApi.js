import { BASE_URL } from "../const";

class AuthApi {
  constructor(options) {
    this._options = options;
  }

  //Загрузка информации о пользователе с сервера
  getEmail() {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Авторизация
  signin(userInfo) {
    return fetch(this._options.baseUrl + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: userInfo.password,
        email: userInfo.email,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Регистрация
  signup(userInfo) {
    return fetch(this._options.baseUrl + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: userInfo.password,
        email: userInfo.email,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

export const authApi = new AuthApi({
  baseUrl: BASE_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});