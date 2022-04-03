import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popup.querySelector('.popup__image-big')
        this._popupTitle = this._popup.querySelector('.popup__image-caption')
    }

    // Открытие попапа и заполнение полей 
    openPopup({ name, link }) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupTitle.textContent = name;
        super.openPopup();
    }
}