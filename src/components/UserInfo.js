export default class UserInfo {
    constructor({ nameElementSelector, aboutElementSelector }) {
        this._nameElement = document.querySelector(nameElementSelector);
        this._aboutElement = document.querySelector(aboutElementSelector);
    }

    // Получение данных пользователи из html
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
}