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
let popupEditProfile = document.querySelector('.popup_edit-form');                     // попап редактирования профиля
let openPopupButton = document.querySelector('.profile__edit-button');                 // попап кнопка редактировать профиль
let popupCloseButton = document.querySelector('.popup__close-button');                 // закрытие окна редактирования профиля
let popupName = document.querySelector('.popup__input_profile_name');                  // редактирование профиля - имя
let popupJob = document.querySelector('.popup__input_profile_job');                    // редактирование профиля - профессия
let profileName = document.querySelector('.profile__name');                            // имя в шапке
let profileJob = document.querySelector('.profile__job');                              // профессия в шапке
let cardsList = document.querySelector('.elements');                                   // html ставим сюда
let poupEditPlace = document.querySelector('.popup_add-form');                         // попап новое место
let openProfileButton = document.querySelector('.profile__add-button');                // добавить данные в профиль
let popupCloseForm = document.querySelector('.popup__close-button_add-form');          // закрытие окна нового места
let poupPlaceName = document.querySelector('.popup__input_plase_name');                // добавление названия новой картинки
let poupPlaceLink = document.querySelector('.popup__input_plase_link');                // добавление новой картинки
let popupBigImage = document.querySelector('.popup__image-preview');                   // попап большой картинки
let popupCloseBigImage = document.querySelector('.popup__close-button_image_preview'); // закрытие большой картинки
let nameBigImage = document.querySelector('.popup__image-big');                        // большая картинка
let captionBigImage = document.querySelector('.popup__image-caption');                 // подпись большой картинки

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Попап редактирования профиля. Сначала заносим данные в поля инпутов и потом открывыем попап профиля.
openPopupButton.addEventListener('click', function () {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  openPopup(popupEditProfile);
}); 

// Закрытие попапа профиля
popupCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

// Попап добавления нового места. Сначала очищаем поля инпутов и потом открываем попап.
openProfileButton.addEventListener('click', function () {
  poupPlaceName.value = '';
  poupPlaceLink.value = '';
  openPopup(poupEditPlace);
}); 

// Закрытие попапа места
popupCloseForm.addEventListener('click', function () {
  closePopup(poupEditPlace);
});

// Попап превью картинки
function cardPreview(event) {
  // Название места и картинка лежат в разных контейнерах и соответственно соседних DOM узлах,
  // событие происходит в контейнере с картинкой и как достучаться до контейнера с названием я хз,
  // поэтому беру название из alt картинки, благо мы сами его туда и засунули
  captionBigImage.textContent = event.target.alt; 
  nameBigImage.alt = event.target.alt;
  nameBigImage.src = event.target.src;
  openPopup(popupBigImage);
}

//Закрытие попапа превью картинки
popupCloseBigImage.addEventListener('click', function () {
  closePopup(popupBigImage);
});

// удаление карточки
function CardRemove(event) {
  event.target.closest('.element').remove();
}

// лайк на карточке
function cardLike(event) {
  event.target.classList.toggle('element__like_aktive');
}

// Сохранение и отправка изменений профиля
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(popupEditProfile);  
}

// добавление карточек
function cardSubmitList(evt) {
  evt.preventDefault();
  // передаeм функции значения инпутов попапа
  const newCard = creatNewCard(poupPlaceName.value, poupPlaceLink.value); 
  // добавление новой карточки
  addObject(cardsList, newCard);
  closePopup(poupEditPlace);
}

// добавление html из темплейта в начало списка
function addObject(placeInHtml, object) {
  placeInHtml.prepend(object);
}

// клонировани шаблона карточки и добавление слушателей для карточки
function creatNewCard(cardTitle, cardPicLink) {
  
  // content - берет только внутренности темплэйта
  let cardTemplate = document.querySelector('.item_template').content; 
  
  // клонирование шаблона карточки в переменную
  let newCard = cardTemplate.querySelector('.element').cloneNode(true); 
  
  // заполним название, alt и src
  newCard.querySelector('.element__name').textContent = cardTitle; 
  newCard.querySelector('.element__image').alt = cardTitle; 
  newCard.querySelector('.element__image').src = cardPicLink;
  
  //слушатели
  newCard.querySelector('.element__trash').addEventListener('click', CardRemove);
  newCard.querySelector('.element__like').addEventListener('click', cardLike);
  newCard.querySelector('.element__image').addEventListener('click', cardPreview);
    
  return newCard;
}

// Стартовая загрузка карточек из массива
initialCards.forEach((card) => {
  const newCard = creatNewCard(card.name, card.link);
  addObject(cardsList, newCard);
});

// Обработчики событий
popupEditProfile.addEventListener('submit', formSubmitHandler);
poupEditPlace.addEventListener('submit', cardSubmitList);