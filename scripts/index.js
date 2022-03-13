import Card from "./Card.js"
import { initialCards } from "./cards.js"
import { enableValidation, addCard, editForm, page, profileEditPopup, profileButtonOpenPopup, popupName, cardsList, popupJob, profileName, profileJob, plaseEditPopup, profileButtonAddPopup, poupPlaceName, poupPlaceLink, imagePreviewBigPopup, nameBigImage, captionBigImage, disabled, popups } from "./constants.js"
import { FormValidator } from "./FormValidator.js"

//Запуск валидации
const editProfileValidator = new FormValidator(enableValidation, editForm)
const addCardValidator = new FormValidator(enableValidation, addCard)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

// Попапы, открытие, закрытие разными способами
// Открытие попапа
function openPopup(popup) {
  page.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_opened');
}

// Закрытие попапа при клике на оверлей и при клике на крестик
function closePopupOverley() {
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

closePopupOverley();

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', closePopupEsc);
}

// закрытие попапа Esc, слушатель этого события навешиваю при открытии и снимаю при закрытии попапа.
const closePopupEsc = (event) => {
  if (event.key === 'Escape') {
      const popupOpened = page.querySelector('.popup_opened');
     closePopup(popupOpened);
   }
} 

// Попап редактирования профиля. Сначала заносим данные в поля инпутов и потом открываем попап профиля.
profileButtonOpenPopup.addEventListener('click', function () {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
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

// Делаем пустые поля добавления новой карточки, при открытии формы - нерабочими
function disabledProfileButton() { 
  disabled.setAttribute('disabled', true);
  disabled.classList.add('popup__submit-button_disabled');
}

// Попап добавления нового места
profileButtonAddPopup.addEventListener('click', function () {
  disabledProfileButton();
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