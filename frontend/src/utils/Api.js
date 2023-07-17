
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = '';
        this.likeCard = this.likeCard.bind(this);
        this.delCard = this.delCard.bind(this);
    }

    get token() {
      return this._token;
    }

    set token(value) {
      this._token = value;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(this._baseUrl+'/cards', {
            method: 'GET',
            credentials: 'include'})
            .then(this._checkResponse);
    }

    addCard({name, link}) {
        return fetch(this._baseUrl+'/cards', {
                     method: 'POST',
                     credentials: 'include',
                     headers: {
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
                     credentials: 'include',
                     headers: {
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
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }})
        .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._baseUrl+'/users/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
            }})
            .then(this._checkResponse);
    }

    setUserInfo({name, about}) {
        return fetch(this._baseUrl+'/users/me', {
                     method: 'PATCH',
                     credentials: 'include',
                     headers: {
                     'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({name: name, about: about})
               })
            .then(this._checkResponse);
    }

    setUserAvatar({avatar}) {
        return fetch(this._baseUrl+'/users/me/avatar', {
                     method: 'PATCH',
                     credentials: 'include',
                     headers: {
                     'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({avatar: avatar})
               })
            .then(this._checkResponse);
    }

    signup = (email, password) => {
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({password, email})
        })
        .then(this._checkResponse)
    }

    signin = (email, password) => {
        console.log(`signin: ${this._baseUrl}/signin`);
        return fetch(this._baseUrl+'/signin', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({password, email})
        })
        .then(this._checkResponse)
    };

    signout = () => {
        console.log(`signout: ${this._baseUrl}/users/me`);
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'DELETE',
          credentials: 'include'
        })
        .then(this._checkResponse)
    };

    checkToken = (checkedToken) => {
        console.log(`checkedToken: ${checkedToken}`)
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
          }
        })
        .then(this._checkResponse)
    }
}

const api = new Api({
    baseUrl: 'http://mesto.ok.front.nomoredomains.work',
    //baseUrl: 'http://localhost:3001',
})

export default api;
