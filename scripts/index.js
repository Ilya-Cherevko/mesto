const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//Переменные
const page = document.querySelector('.page');                                                   // вся страница
const profileEditPopup = document.querySelector('.popup_edit-form');                            // попап редактирования профиля
const profileButtonOpenPopup = document.querySelector('.profile__edit-button');                 // попап кнопка редактировать профиль
const profileButtonClosePopup = document.querySelector('.popup__close-button');                 // закрытие окна редактирования профиля
const popupName = document.querySelector('.popup__input_profile_name');                         // редактирование профиля - имя
const popupJob = document.querySelector('.popup__input_profile_job');                           // редактирование профиля - профессия
const profileName = document.querySelector('.profile__name');                                   // имя в шапке
const profileJob = document.querySelector('.profile__job');                                     // профессия в шапке
const cardsList = document.querySelector('.elements');                                          // html ставим сюда
const plaseEditPopup = document.querySelector('.popup_add-form');                               // попап новое место
const profileButtonAddPopup = document.querySelector('.profile__add-button');                   // добавить данные в профиль
const plaseButtonClosePopup = document.querySelector('.popup__close-button_add-form');          // закрытие окна нового места
const poupPlaceName = document.querySelector('.popup__input_plase_name');                       // добавление названия новой картинки
const poupPlaceLink = document.querySelector('.popup__input_plase_link');                       // добавление новой картинки
const imagePreviewBigPopup = document.querySelector('.popup_image-form');                       // попап большой картинки
const imagePreviewBigClosePopup = document.querySelector('.popup__close-button_image_preview'); // закрытие большой картинки
const nameBigImage = document.querySelector('.popup__image-big');                               // большая картинка
const captionBigImage = document.querySelector('.popup__image-caption');                        // подпись большой картинки
const popupLayout = document.querySelector('.popup__layout');                                   // оверлей
const disabled = document.querySelector('.popup__submit-button_add-form');                      // кнопка добавления формы
const cardTemplate = document.querySelector('.item__template').content;                         // константа вынесенная из creatNewCard, content - берет только внутренности темплэйта
const popups = document.querySelectorAll('.popup');                                             // найдем все попапы

// открытие попапа
/*function openPopup(popup) {
  popup.classList.add('popup_opened');
}*/

function openPopup(popup) {
  page.addEventListener('click', closePopupOverley);
  page.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_opened');
}

// Закрытие попапа нажатием мышкой в оверлее
/*document.addEventListener("mousedown", function (evt) {
  if (evt.target.classList.contains("popup__layout")) {
    closePopup(document.querySelector(".popup_opened"));
  }
});*/

// Закрытие попапа при клике на оверлей и при клике на крестик, эту функцию можно добавлять и убирать слушателем
function closePopupOverley() {
// Переберем все попапы и навесим каждому обработчик
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__layout')) {   // если там куда мы кликаем мышкой есть объект с нужным классом
            closePopup(popup)                                   // закроем попап при клике на оверлей
        }
        //if (evt.target.classList.contains('popup__close-button')) {  // закроем попап при клике на крестике, надо перелопатить код
        //  closePopup(popup)
        //}
    })
})
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('click', closePopupOverley);
  page.removeEventListener('keydown', closePopupEsc);
}

// закрытие попапа Esc, слушатель этого события без проблем навешиваю и снимаю.
const closePopupEsc = (event) => {
  if (event.key === 'Escape') {
      const popupOpened = page.querySelector('.popup_opened');
     closePopup(popupOpened);
   }
} 

// Попап редактирования профиля. Сначала заносим данные в поля инпутов и потом открывыем попап профиля.
profileButtonOpenPopup.addEventListener('click', function () {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  openPopup(profileEditPopup);
}); 

// Закрытие попапа профиля
profileButtonClosePopup.addEventListener('click', function () {
  closePopup(profileEditPopup);
});

const buttonPlase = () => {
  button = document.querySelector('.popup__submit-button_add-form')
  button.classList.add('popup__submit-button_disabled');
}

// Попап добавления нового места
profileButtonAddPopup.addEventListener('click', function () {
  openPopup(plaseEditPopup);
}); 

// Закрытие попапа места
plaseButtonClosePopup.addEventListener('click', function () {
  closePopup(plaseEditPopup);
});

//Закрытие попапа превью картинки
imagePreviewBigClosePopup.addEventListener('click', function () {
  closePopup(imagePreviewBigPopup);
});

// удаление карточки
function removeCard (event) {
  event.target.closest('.element').remove();
}

// лайк на карточке
function likeCard (event) {
  event.target.classList.toggle('element__like_aktive');
}

// Сохранение и отправка изменений профиля
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  // Перезапись значения полей профиля
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(profileEditPopup);  
}

// Добавление карточек. После добавления, перед закрытием, поля формы очищаем.
function handleCardSubmit (evt) {
  evt.preventDefault();
  // передаeм функции значения инпутов попапа
  const newCard = creatNewCard(poupPlaceName.value, poupPlaceLink.value); 
  // добавление новой карточки
  addObject(cardsList, newCard);
  // очистка полей формы
  poupPlaceName.value = '';
  poupPlaceLink.value = '';

  // Делаем поля добавления новой карточки, когда они пусты при открытии формы - нерабочими 
  disabled.setAttribute('disabled', true);
  disabled.classList.add('popup__submit-button_disabled');
  
  closePopup(plaseEditPopup);
}

// добавление html из темплейта в начало списка
function addObject(placeInHtml, object) {
  placeInHtml.prepend(object);
}

// клонировани шаблона карточки, добавление слушателей для карточки и открытие превью картинки карточки
function creatNewCard(cardName, cardLink) {
    
  // клонирование шаблона карточки в переменную
  const newCard = cardTemplate.querySelector('.element').cloneNode(true); 
  
  // найдем картинку один раз, а используем три )
  const newImage = newCard.querySelector('.element__image');
  
  // заполним название, alt и src
  newCard.querySelector('.element__name').textContent = cardName; 
  newImage.alt = cardName;
  newImage.src = cardLink;
  
  //слушатели
  newCard.querySelector('.element__trash').addEventListener('click', removeCard);
  newCard.querySelector('.element__like').addEventListener('click', likeCard);
  newImage.addEventListener('click', () => handleCardClick(cardName, cardLink));
  
  // Попап превью картинки теперь здесь
  function handleCardClick () {
    captionBigImage.textContent = cardName; 
    nameBigImage.alt = cardName;
    nameBigImage.src = cardLink;
    openPopup(imagePreviewBigPopup);
  }

  return newCard;
}

// Стартовая загрузка карточек из массива
initialCards.forEach((card) => {
  const newCard = creatNewCard(card.name, card.link);
  addObject(cardsList, newCard);
});

// Обработчики событий
profileEditPopup.addEventListener('submit', handleProfileFormSubmit);
plaseEditPopup.addEventListener('submit', handleCardSubmit);