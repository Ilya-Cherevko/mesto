export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer // По сути функция createCard из index.js
        this._container = document.querySelector(containerSelector) // Массив готовых карточек из DOM 
    }

    // Инициализация карточек, перебирает элементы и применяет к ним функцию колл бэк
    // Items - массив карточек
    // Здесь item - данные карточки (лайк, владелец, линк и т.д.)

    renderItems(items) {
        items.forEach(item => {
            this.addItem(this._renderer(item))
        })
    }

    // Готовые карточки вставим в DOM, добавляет элементы в контейнер на страницу.
    // Здесь item - одна готовая карточка
    // this._container - готовые карточки

    addItem(item, option = 'append') {
        switch (option) {
            case 'append':
                this._container.append(item) // начальный массив карточек в конец
                break;
            case 'prepend':
                this._container.prepend(item) // новую карточку в начало
                break;
        }
    }
}