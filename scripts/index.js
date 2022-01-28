let infoOpenPopupButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close-button')
let popupContainer = document.querySelector('.popup__container')
let popupSubmitButton = document.querySelector('.popup__submit-button')
let popupName = document.querySelector('.popup__nameInput')
let popupJob = document.querySelector('.popup__jobInput')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let popupFormField = document.querySelector('.popup__form-container')

// Запишем в поля формы значения страницы
function setDefaultPopup() {
  popupName.value = profileName.textContent
  popupJob.value = profileJob.textContent
}

// Открытие формы
function openPopup() {
  popup.classList.add('popup_opened')
  setDefaultPopup()
}

// Закрытие формы
function closePopup() {
  popup.classList.remove('popup_opened')
}

// Сохранение и отпрвка изменений
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup();  
}

// Обработчики событий
infoOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupFormField.addEventListener('submit', formSubmitHandler);