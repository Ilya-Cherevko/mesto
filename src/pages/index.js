import { initialCards } from "../Utils/cards.js"
import { configForm, profileButtonOpenPopup, popupName, popupJob, profileButtonAddPopup, userInfoSelectors  } from "../Utils/constants.js"

import '../pages/index.css';

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
//import Popup from "../components/Popup.js";

const formEditValidator = new FormValidator(configForm, document.forms.edit)
const formAddValidator = new FormValidator(configForm, document.forms.add)

// Слушатель закрытия esc навешивается в popup
const popupImage = new PopupWithImage('.popup_image-form') 
// Слушатели закрытия Esc навешивается в popup, 
// в PopupWithForm добавляеся слушатель передачи данных
const popupEdit = new PopupWithForm('.popup_edit-form', handleProfileFormSubmit) 
const popupAdd = new PopupWithForm('.popup_add-form', handleAddFormSubmit) 

const userInfo = new UserInfo(userInfoSelectors)

// Принимает исходный массив карточек, делает из него карточки и вставляет в DOM
//const cardsList = new Section({ items: initialCards, renderer: createCard }, '.elements')
const cardsList = new Section({ items: initialCards, renderer: insertCard }, '.elements')

// Добавление карточки в разметку страницы с помощью класса Section
function insertCard (item) {
  cardsList.addItem(createCard(item))  
}


// Возвращение готовой карточки. 
// Получает item - две строки из исходных данных, id карточки,
// и слушатель открытия картинки. Создает карточку
function createCard(item) {
  return new Card(item, '#card', handleCardClick).generateCard()
}

// Слушатели закрытия попапа нажатием на крестик или оверлей
popupImage.setEventListeners()
popupEdit.setEventListeners()
popupAdd.setEventListeners()

// Попап превью большой картинки - открытие
function handleCardClick(data) {
  popupImage.openPopup(data)
}

//Попап редактирования профиля - открытие
function handleClickOpenProfilePopup() {
  const userData = userInfo.getUserInfo()
  popupName.value = userData.name;
  popupJob.value = userData.about;
  formEditValidator.resetValidation()
  popupEdit.openPopup()
}

//Попап редактирования профиля - передача данных и закрытие 
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data)
  popupEdit.closePopup()
}

//Попап добавления нового места - открытие
function handleClickOpenAddPopup() {
  formAddValidator.resetValidation()
  popupAdd.openPopup()
}

//Попап добавления нового места - передача данных и закрытие
function handleAddFormSubmit(newCard) {
  cardsList.addItem(createCard(newCard))  //добавление полученной из функции карточки в разметку страницы с помощью класса Section
  popupAdd.closePopup()
}

//Включение валидации форм
formEditValidator.enableValidation()
formAddValidator.enableValidation()

//Отображение карточек 
cardsList.renderItems()

// Слушатели кнопок изменения профиля и добавления новой карточки
profileButtonOpenPopup.addEventListener('click', handleClickOpenProfilePopup);
profileButtonAddPopup.addEventListener('click', handleClickOpenAddPopup)