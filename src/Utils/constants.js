//Переменные

// Неактивные
//export const page = document.querySelector('.page');                                                   // вся страница
//export const profileEditPopup = document.querySelector('.popup_edit-form');                            // попап редактирования профиля
//export const profileName = document.querySelector('.profile__name');                                   // имя в шапке
//export const profileJob = document.querySelector('.profile__job');                                     // профессия в шапке
//export const plaseEditPopup = document.querySelector('.popup_add-form');                               // попап новое место
//export const poupPlaceName = document.querySelector('.popup__input_plase_name');                       // добавление названия новой картинки
//export const poupPlaceLink = document.querySelector('.popup__input_plase_link');                       // добавление новой картинки
//export const imagePreviewBigPopup = document.querySelector('.popup_image-form');                       // попап большой картинки
//export const nameBigImage = document.querySelector('.popup__image-big');                               // большая картинка
//export const captionBigImage = document.querySelector('.popup__image-caption');                        // подпись большой картинки
//export const popups = document.querySelectorAll('.popup');                                             // попапы!
//export const addCard = plaseEditPopup.querySelector('.popup__form-container');                         // Поля формы новое место для валидации
//export const editForm = profileEditPopup.querySelector('.popup__form-container');                      // Поля формы изменить профиль для валидации
//export const formValidators = {}

// Активные
export const profileButtonOpenPopup = document.querySelector('.profile__edit-button');                   // попап кнопка редактировать профиль
export const profileButtonClosePopup = document.querySelector('.popup__close-button');                   // закрытие окна редактирования профиля
export const popupName = document.querySelector('.popup__input_profile_name');                           // редактирование профиля - имя
export const popupJob = document.querySelector('.popup__input_profile_job');                             // редактирование профиля - профессия
export const cardsList = document.querySelector('.elements');                                            // html ставим сюда
export const profileButtonAddPopup = document.querySelector('.profile__add-button');                     // добавить данные в профиль
export const plaseButtonClosePopup = document.querySelector('.popup__close-button_add-form');            // закрытие окна нового места
export const imagePreviewBigClosePopup = document.querySelector('.popup__close-button_image_preview');   // закрытие большой картинки
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
  aboutElementSelector: '.profile__job'
}