export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handlePopupClose = this._handlePopupClose.bind(this)
        this._handleEscKey = this._handleEscKey.bind(this)
    }

    // закрытие попапа Esc
    _handleEscKey = (event) => {
        if (event.key === 'Escape') {
            this.closePopup();
         }
      } 
    
    // Закрытие попапа при клике на оверлей и при клике на крестик
    _handlePopupClose(evt) {
        const targetOverlay = evt.target.classList.contains('popup__overlay');
        const targetButtonClose = evt.target.classList.contains('popup__close-button');
        if (targetOverlay || targetButtonClose) {
            this.closePopup();
        }
    }

    // Снятие слушателей
    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscKey);
    }

    // Навешивание слушателей
    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handlePopupClose);
    }

    // Открытие попапа
    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscKey);
    }

    // Закрытие попапа
    closePopup() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners()
    }
}