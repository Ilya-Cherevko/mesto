import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector)
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form-container')
        this._submitForm = this._submitForm.bind(this)
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
    }

    _getInputValues() {
        const data = {};
        this._inputList.forEach(item => {
            data[item.name] = item.value
        })
        return data
    }

    _submitForm() {
        this._handleSubmitForm(this._getInputValues())
    }

    _removeEventListeners() {
        super._removeEventListeners()
        this._form.removeEventListener('submit', this._submitForm)
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._submitForm)
    }

    close() {
        super.closePopup();
        this._form.reset()
    }
}