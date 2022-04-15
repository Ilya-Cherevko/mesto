export default class UserInfo {
    constructor({ nameElementSelector, aboutElementSelector, avatarElementSelector }) {
        this._nameElement = document.querySelector(nameElementSelector);
        this._aboutElement = document.querySelector(aboutElementSelector);
        this._avatarElement = document.querySelector(avatarElementSelector);
    }

    // Получение данных пользователя из html
    getUserInfo() {
        const data = {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
        }
        return data
    }

    // Заполнение данными пользователя полей html
    setUserInfo({ name, about }) {
        this._nameElement.textContent = name
        this._aboutElement.textContent = about
    }

    // Аватар
    setAvatar({ avatar }) {
        this._avatarElement.src = avatar
    }
}