import { initialCards } from "../Utils/cards.js"
import { configForm, profileButtonOpenPopup, popupName, popupJob, profileButtonAddPopup, userInfoSelectors  } from "../Utils/constants.js"

import '../pages/index.css';

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const formEditValidator = new FormValidator(configForm, document.forms.edit)
const formAddValidator = new FormValidator(configForm, document.forms.add)
const popupImage = new PopupWithImage('.popup_image-form')
const popupEdit = new PopupWithForm('.popup_edit-form', handleProfileFormSubmit)
const popupAdd = new PopupWithForm('.popup_add-form', handleAddFormSubmit)
const userInfo = new UserInfo(userInfoSelectors)
const cardsList = new Section({ items: initialCards, renderer: createCard }, '.elements')

function createCard(item) {
  return new Card(item, '#card', handleCardClick).generateCard()
}
console.log(cardsList)
function handleCardClick(data) {
  popupImage.openPopup(data)
}

function handleClickOpenProfilePopup() {
  const userData = userInfo.getUserInfo()
  popupName.value = userData.name;
  popupJob.value = userData.about;
  formEditValidator.resetValidation()
  popupEdit.openPopup()
}

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data)
  popupEdit.closePopup()
}

function handleAddFormSubmit(newCard) {
  cardsList.addItem(createCard(newCard))
  popupAdd.closePopup()
}

function handleClickOpenAddPopup() {
  formAddValidator.resetValidation()
  popupAdd.openPopup()
}

formEditValidator.enableValidation()
formAddValidator.enableValidation()

cardsList.renderItems()

profileButtonOpenPopup.addEventListener('click', handleClickOpenProfilePopup);
profileButtonAddPopup.addEventListener('click', handleClickOpenAddPopup)