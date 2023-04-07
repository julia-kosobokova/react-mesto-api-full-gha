import {BASE_URL} from "../const";

class Api {
  constructor(options) {
    this._options = options;
  }

  //Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(this._options.baseUrl + "/users/me", {
      headers: this._options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(this._options.baseUrl + "/cards", {
      headers: this._options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Сохранение профиля
  saveUserInfo(userInfo) {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.description,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Добавление новой карточки
  saveNewCard(card) {
    return fetch(this._options.baseUrl + "/cards", {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Постановка лайка
  addLike(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this._options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Снятие лайка
  removeLike(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: this._options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Обновление аватара пользователя
  updateUserAvatar(avatar) {
    return fetch(this._options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar,
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

export const api = new Api({
baseUrl: BASE_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});
