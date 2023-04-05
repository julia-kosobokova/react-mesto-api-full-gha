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
  // baseUrl: "https://auth.nomoreparties.co",
  // baseUrl: "http://localhost:3000",
  baseUrl: "http://mesto.kosobokova.nomoredomains.work",
  headers: {
    // authorization: "2e553a64-7c1d-4473-abd0-835bab4139ba",
    "Content-Type": "application/json",
  },
});