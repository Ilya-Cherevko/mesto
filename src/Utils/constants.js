//Переменные
export const profileButtonOpenPopup = document.querySelector('.profile__edit-button');                   // попап кнопка редактировать профиль
export const profileButtonClosePopup = document.querySelector('.popup__close-button');                   // закрытие окна редактирования профиля
export const popupName = document.querySelector('.popup__input_profile_name');                           // редактирование профиля - имя
export const popupJob = document.querySelector('.popup__input_profile_job');                             // редактирование профиля - профессия
export const cardsList = document.querySelector('.elements');                                            // html ставим сюда
export const profileButtonAddPopup = document.querySelector('.profile__add-button');                     // добавить данные в профиль
export const plaseButtonClosePopup = document.querySelector('.popup__close-button_add-form');            // закрытие окна нового места
export const imagePreviewBigClosePopup = document.querySelector('.popup__close-button_image_preview');   // закрытие большой картинки
export const cardDeletConfirm = document.querySelector('.popup_confirm')
export const avatarButtonOpenPopup = document.querySelector('.profile__avatar-box');
export const disabled = document.querySelector('.popup__submit-button_add-form');                        // кнопка добавления формы

export const configForm = {                                                                              // константы для валидации
    formSelector: '.popup__form-container',
    inputSelector: '.popup__input',
    fieldsetList: '.popup__form-fieldset',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input-error_active',
    inputErrorAdd: 'popup__input-error_border-red',
  }; 

export const userInfoSelectors = {
  nameElementSelector: '.profile__name',
  aboutElementSelector: '.profile__job',
  avatarElementSelector: '.profile__avatar'
}

export const optionsApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
  headers: {
      authorization: 'f5c0f5ef-697f-471d-91a7-72c1ba478dc4',
      'Content-Type': 'application/json'
  }
}

export const cardList = [];

export const cardBoxSelector = '.elements';
export const cardTemplateSelector = '#card'