export default class Card {
  constructor(data, cardSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
      const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
      return cardElement;
  }

  _setEventListeners() {
      this._element.querySelector('.element__trash').addEventListener('click', () => this._removeCard())
      this._element.querySelector('.element__like').addEventListener('click', (evt) => this._likeCard(evt))
      this._cardImage.addEventListener('click', () => {
          this._handleCardClick({ name: this._name, link: this._link })
      })
  }

  _likeCard(evt) {
      evt.target.classList.toggle('element__like_aktive')
  }
    
  _removeCard() {
      this._element.remove()
      this._element = null
  }

  generateCard() {
      this._element = this._getTemplate()
      this._cardImage = this._element.querySelector('.element__image')
      this._element.querySelector('.element__name').textContent = this._name;
      this._cardImage.textContent = this._link;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._setEventListeners()
      return this._element
  }
}