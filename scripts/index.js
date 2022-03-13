import Card from "./Card.js"
import { initialCards } from "./cards.js"
import { formValidators, configForm, addCard, editForm, page, profileEditPopup, profileButtonOpenPopup, popupName, cardsList, popupJob, profileName, profileJob, plaseEditPopup, profileButtonAddPopup, poupPlaceName, poupPlaceLink, imagePreviewBigPopup, nameBigImage, captionBigImage, popups } from "./constants.js"
import { FormValidator } from "./FormValidator.js"

//Запуск валидации
const editProfileValidator = new FormValidator(configForm, editForm)
const addCardValidator = new FormValidator(configForm, addCard)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

//Запуск валидации - с наскока не пошло, надо копать чуть глубже и дольше
/*const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  console.log(formList) // тут работает
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config) //(ошибка из formvalidatora - Uncaught TypeError: this._form.querySelectorAll is not a function)
    console.log(validator) // сюда не дошло 
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    console.log(formName) // сюда не дошло
   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(configForm);*/


// Попапы, открытие, закрытие разными способами
// Открытие попапа
function openPopup(popup) {
  page.addEventListener('keydown', handleEscKey);
  popup.classList.add('popup_opened');
}

// Закрытие попапа при клике на оверлей и при клике на крестик
function handlePopupClose() {
// Переберем все попапы и навесим каждому обработчик
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__overlay')) {   // закроем попап при клике на оверлей
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {  // закроем попап при клике на крестике
            closePopup(popup)
        }
    })
})
}

handlePopupClose();

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', handleEscKey);
}

// закрытие попапа Esc, слушатель этого события навешиваю при открытии и снимаю при закрытии попапа.
const handleEscKey = (event) => {
  if (event.key === 'Escape') {
      const popupOpened = page.querySelector('.popup_opened');
     closePopup(popupOpened);
   }
} 

// Попап редактирования профиля. Сначала заносим данные в поля инпутов и потом открываем попап профиля.
profileButtonOpenPopup.addEventListener('click', function () {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  editProfileValidator.resetValidation()
  openPopup(profileEditPopup);
}); 

// Сохранение и отправка изменений профиля
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  // Перезапись значения полей профиля
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(profileEditPopup);  
}

// Попап добавления нового места
profileButtonAddPopup.addEventListener('click', function () {
  addCardValidator.resetValidation()
  openPopup(plaseEditPopup);
}); 

//Открытие превью картинки
function handleCardClick(name, link) {
  nameBigImage.src = link;
  nameBigImage.alt = name;
  captionBigImage.textContent = name;
  openPopup(imagePreviewBigPopup)
}

//Карточки
function createCard(item) {
  return new Card(item, '#card', handleCardClick).generateCard()
}

function insertCard(item) {
  cardsList.prepend(createCard(item))
}

function renderCards() {
  initialCards.forEach(insertCard)
}


function handleCardFormSubmit() {
  const newCard = {
      name: poupPlaceName.value,
      link: poupPlaceLink.value
  };
  initialCards.push(newCard);
  insertCard(newCard);
  closePopup(plaseEditPopup);
  addCard.reset()
}

// Обработчики событий
profileEditPopup.addEventListener('submit', handleProfileFormSubmit);
addCard.addEventListener('submit', handleCardFormSubmit);

renderCards()    // Показать карточки на странице