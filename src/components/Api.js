export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }
  
    _fetch(path, method, addBody) {
        const url = this._baseUrl + path
        return fetch(url, {
            method,
            headers: this._headers,
            body: addBody ? addBody() : null
        })
        
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`)
            })
    }
  
    getUserInfo() {
        return this._fetch('users/me', 'GET')
    }
  
    getInitialCards() {
        return this._fetch('cards', 'GET')
    }
  
    editUserInfo({ name, about }) {
        const addBody = () => {
            return JSON.stringify({
                name,
                about
            })
        }
        return this._fetch('users/me', 'PATCH', addBody)
    }
  
    addCard({ name, link }) {
        const addBody = () => {
            return JSON.stringify({
                name,
                link
            })
        }
        return this._fetch('cards', 'POST', addBody)
    }
  
    deleteCard(cardId) {
        return this._fetch(`cards/${cardId}`, 'DELETE')
    }
  
    addLikeCard(cardId) {
        return this._fetch(`cards/${cardId}/likes`, 'PUT')
    }
  
    deleteLikeCard(cardId) {
        return this._fetch(`cards/${cardId}/likes`, 'DELETE')
    }
  
    editUserAvatar({ avatar }) { 
      const addBody = () => {
          return JSON.stringify({
              avatar
          })
      }
      return this._fetch('users/me/avatar', 'PATCH', addBody)
  }
  
  
  }