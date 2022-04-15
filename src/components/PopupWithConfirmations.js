import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmPopup) {
        super(popupSelector)
        this._handleConfirmPopup = handleConfirmPopup;
        this._confirmButton = this._popup.querySelector('.popup__delete')
        this._confirm = this._confirm.bind(this)
    }

    _confirm() {
        this._handleConfirmPopup(this._cardId)
    }

    _removeEventListeners() {
        super._removeEventListeners()
    }

    setEventListeners() {
        super.setEventListeners()
        this._confirmButton.addEventListener('click', this._confirm)
        
    }

    openPopup(cardId) {
        super.openPopup()
        this._cardId = cardId
    }
}