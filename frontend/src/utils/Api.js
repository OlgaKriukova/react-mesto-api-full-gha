
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;
        this.likeCard = this.likeCard.bind(this);
        this.delCard = this.delCard.bind(this);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(this._baseUrl+'/cards', {
            headers: {
              authorization: this._authorization
            }})
            .then(this._checkResponse);
    }

    addCard({name, link}) {
        return fetch(this._baseUrl+'/cards', {
                     method: 'POST',
                     headers: {
                     authorization: this._authorization,
                     'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({name: name, link: link})
               })
            .then(this._checkResponse);
    }

    delCard(cardId) {
        console.log(this._baseUrl+'/cards/'+cardId);
        return fetch(this._baseUrl+'/cards/'+cardId, {
                     method: 'DELETE',
                     headers: {
                     authorization: this._authorization,
                     'Content-Type': 'application/json'
                     }
               })
            .then(this._checkResponse);
    }

    likeCard(cardId, active) {
        let method;
        if (active) {method = 'PUT';}
        else {method = 'DELETE';}

        return fetch(this._baseUrl+'/cards/'+cardId+'/likes', {
            method: method,
            headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
            }})
        .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._baseUrl+'/users/me', {
            headers: {
              authorization: this._authorization
            }})
            .then(this._checkResponse);
    }

    setUserInfo({name, about}) {
        return fetch(this._baseUrl+'/users/me', {
                     method: 'PATCH',
                     headers: {
                     authorization: this._authorization,
                     'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({name: name, about: about})
               })
            .then(this._checkResponse);
    }

    setUserAvatar({avatar}) {
        return fetch(this._baseUrl+'/users/me/avatar', {
                     method: 'PATCH',
                     headers: {
                     authorization: this._authorization,
                     'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({avatar: avatar})
               })
            .then(this._checkResponse);
    }

}

const api = new Api({
    baseUrl: 'http://mesto.ok.front.nomoredomains.work',
    headers: {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkYjc2MzllYTRmMTI0MTJhN2Q1OTUiLCJpYXQiOjE2ODkxMDY0MzIsImV4cCI6MTY4OTcxMTIzMn0.6fpMn3Yem7mxRB6qeY-gYASyjzvd9ry1uGQPdDZ60SI',
      'Content-Type': 'application/json'
    }
})

export default api;
