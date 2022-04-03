export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items // Массив исходных данных карточек
        this._renderer = renderer // По сути функция createCard из index.js
        //this.renderItems(items);
        this._container = document.querySelector(containerSelector) // Массив готовых карточек из DOM 
    }

    // Инициализация карточек, перебирает элементы и применяет к ним функцию колл бэк
    // Здесь item - две строки из исходных данных
    renderItems() {
        this._items.forEach(item => {
            //this.addItem(this._renderer(item))
            this._renderer(item)
        })
    }

    // Готовые карточки вставим в DOM, добавляет элементы в контейнер на страницу.
    // Здесь item - одна готовая карточка
    // this._container - массив карточек
    addItem(item) {
        this._container.prepend(item) // Тут и так все ясно
    }
}