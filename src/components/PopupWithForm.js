import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector)
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form-container')
        this._submitForm = this._submitForm.bind(this)
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
        this._submitButton = this._popup.querySelector('.popup__submit-button')
    }

    // Получение данных полей формы
    _getInputValues() {
        const data = {};
        this._inputList.forEach(item => {
            data[item.name] = item.value
        })
        return data
    }

    //  Передача данных формы
    _submitForm() {
        this._handleSubmitForm(this._getInputValues())
    }

    // Удаление слушателей событий попапа
    _removeEventListeners() {
        super._removeEventListeners()
    }

    // Навешивание слушателей событий
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._submitForm)
    }

    // Закрытие попапа и сброс формы
    closePopup() {
        super.closePopup();
        this._form.reset()
    }

    // Загрузчик надписи на кнопке при загрузке
    loadButton(isLoading, popup) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохраняем...'
        } else {
            if (popup === 'add') {
                this._submitButton.textContent = 'Создать'
            } else {
                this._submitButton.textContent = 'Сохранить'
            }
        }
    }
}