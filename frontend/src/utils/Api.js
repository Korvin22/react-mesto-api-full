export class Api {
  constructor(settings) {
    this._address = settings.baseUrl;
    this._headers = settings.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me `, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCard() {
    return fetch(`${this._address}/cards `, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  editProfile(newName, newAbout) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  addCard(newName, newLink, newLike) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        link: newLink,
        likes: newLike,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getLikes() {
    return fetch(`${this._address}/cards `, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        document.querySelector(".elements__like-counter").textContent =
          data.likes.length;
      });
  }
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.deleteLike(id);
    }
  }

  changeAvatar(reference) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: reference,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "230562f7-78ba-48ea-b99f-12e65ef62aec",
    "Content-Type": "application/json",
  },
});

export { api };
