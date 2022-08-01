class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl+'/users/me', {
      headers: this._headers
    })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  getInitialCards() {
    return fetch(this._baseUrl+'/cards', {
      headers: this._headers
    })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  editProfile({name, about}){
    return fetch(this._baseUrl+'/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  addNewCard(name, link){
    return fetch(this._baseUrl+'/cards', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  addLike(cardId){
    return fetch(this._baseUrl+'/cards/likes/'+cardId, {
      method: "PUT",
      headers: this._headers
    })
    .then(res =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  removeLike(cardId){
    return fetch(this._baseUrl+'/cards/likes/'+cardId, {
      method: "DELETE",
      headers: this._headers
    })
    .then(res =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  deleteCard(cardId){
    return fetch(this._baseUrl+'/cards/'+cardId, {
      method: "DELETE",
      headers: this._headers
    })
    .then(res =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  setAvatar(avatar){
    return fetch(this._baseUrl+'/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "4b9721d4-f98e-4ede-ad68-f8f2c3264077",
    "Content-Type": "application/json",
  },
});
