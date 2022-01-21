let infoOpenPopupButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup__edited-form')
let popupCloseButton = document.querySelector('.popup__close-button')
let popupContainer = document.querySelector('.popup__container')
let popupSubmitButton = document.querySelector('.popup__submit-button')
let popupName = document.querySelector('.popup__nameInput')
let popupJob = document.querySelector('.popup__jobInput')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__position')
let popupFormField = document.querySelector('.popup__form-container')

// Запишем в поля формы значения страницы
function setDefaultPopup() {
  popupName.value = profileName.textContent
  popupJob.value = profileJob.textContent
}

// Открытие формы
function openPopup(event) {
  event.preventDefault()
  popup.classList.add('popup__opened')
  setDefaultPopup()
}

// Закрытие формы
function closePopup() {
  popup.classList.remove('popup__opened')
}

// Сохраняем изменения
function setRemoveDefault() {
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup();  
}

// Обработчики событий
infoOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
popupSubmitButton.addEventListener('click', setRemoveDefault)

// Закрытие попапа нажатием "Enter"
popup.addEventListener('keypress', function(key) {
  if (key.keyCode === 13) {
    setRemoveDefault();
    closePopup();
  }
  });