import { optionsApi, cardList, cardBoxSelector, avatarButtonOpenPopup, configForm, profileButtonOpenPopup, popupName, popupJob, profileButtonAddPopup, userInfoSelectors  } from "../Utils/constants.js"

import '../pages/index.css';
import '../images/No_avatar.svg';

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmations.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const formEditValidator = new FormValidator(configForm, document.forms.edit)
const formAddValidator = new FormValidator(configForm, document.forms.add)
const formAvatarValidator = new FormValidator(configForm, document.forms.avatar)


// Слушатель закрытия esc навешивается в классе popup
const popupImage = new PopupWithImage('.popup_image-form') 
// Слушатели закрытия Esc навешивается в классе popup, 
// в PopupWithForm добавляеся слушатель передачи данных
const popupEdit = new PopupWithForm('.popup_edit-form', handleProfileFormSubmit) 
const popupAdd = new PopupWithForm('.popup_add-form', handleAddFormSubmit) 
const popupAvatar = new PopupWithForm('.popup_apdate-avatar', handleAvatarFormSubmit)
const popupDeleteConfirm = new PopupWithConfirmation('.popup_confirm', handleConfirmPopup)

// Данные пользователя
const userInfo = new UserInfo(userInfoSelectors)
const api = new Api(optionsApi)

const userInfoServer = api.getUserInfo() 

// Принимает исходный данные карточек, делает карточки и вставляет в DOM
const cardsList = new Section({ renderer: createCard }, cardBoxSelector)

function createCard(item) {
  const card = new Card(item, '#card', userInfoServer, {
      handleCardClick,
      handleDeleteClick,
      likeCard,
      dislikeCard
  })
  cardList.push({
      cardElement: card,
      cardId: item._id,
  })
  return card.generateCard()
}

// Удаление карточки
function handleConfirmPopup(cardId) {
  api.deleteCard(cardId)
      .then(() => { 
          cardList
          .find(card => card.cardId === cardId)
          .cardElement
          .deleteCard()
          popupDeleteConfirm.closePopup()
      })
      .catch(err => console.log("Не удалось удалить карточку:", err))
}

function handleDeleteClick(cardId) {
  popupDeleteConfirm.openPopup(cardId)
}

// Лайки
function likeCard(cardId) {
  return api.addLikeCard(cardId)
}

function dislikeCard(cardId) {
  return api.deleteLikeCard(cardId)
}

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

//Попап редактирования профиля
function handleProfileFormSubmit(data) {
  popupEdit.loadButton(true)
  api.editUserInfo(data)
      .then(res => {
          userInfo.setUserInfo(res)
          popupEdit.closePopup()
      })
      .catch(err => console.log("Не удалось изменить данные профиля:", err))
      .finally(() => popupEdit.loadButton(false))
}

//Попап добавления нового места - открытие
function handleClickOpenAddPopup() {
  formAddValidator.resetValidation()
  popupAdd.openPopup()
}

// Попап добавления нового места - передача данных и закрытие
function handleAddFormSubmit(newCard) {
  popupAdd.loadButton(true)
  api.addCard(newCard)
  
      .then(res => {
          cardsList.addItem(createCard(res), 'prepend')
          popupAdd.closePopup()
      })
      .catch(err => console.log("Не удалось добавить карточку:", err))
      .finally(() => popupAdd.loadButton(false, 'add'))
}

// Попап аватара - открытие
function handleClickOpenAvatarPopup() {
  formAvatarValidator.resetValidation()
  popupAvatar.openPopup()
}

// Попап аватара - передача данных и закрытие
function handleAvatarFormSubmit(data) { 
  popupAvatar.loadButton(true)
  api.editUserAvatar(data)    // data - url адрес картинки есть
  
      .then((res) => {
          userInfo.setAvatar(res) // присвоение адреса картинки аватару
          
          popupAvatar.closePopup()
      })
      .catch(err => console.log("Не удалось сменить аватар:", err))
      .finally(() => popupAvatar.loadButton(false))
}

// Включение валидации форм
formEditValidator.enableValidation()
formAddValidator.enableValidation()
formAvatarValidator.enableValidation()

// Отрисовать страницу с данными, с сервера
function renderPage() {
  Promise.all([userInfoServer, api.getInitialCards()])
      .then(res => {
          userInfo.setUserInfo(res[0])
          userInfo.setAvatar(res[0])
          cardsList.renderItems(res[1])
      })
      .catch(err => console.log("Не удалось загрузить страницу:", err))
}

// Слушатели закрытия попапа нажатием на крестик или оверлей
popupImage.setEventListeners()
popupEdit.setEventListeners()
popupAdd.setEventListeners()
popupAvatar.setEventListeners()
popupDeleteConfirm.setEventListeners()

renderPage()

// Слушатели кнопок изменения профиля и добавления новой карточки
profileButtonOpenPopup.addEventListener('click', handleClickOpenProfilePopup);
profileButtonAddPopup.addEventListener('click', handleClickOpenAddPopup)
avatarButtonOpenPopup.addEventListener('click', handleClickOpenAvatarPopup)