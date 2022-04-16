export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.inputErrorAdd;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    // Показать ошибки
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorAdd);
        errorElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    // Скрыть ошибки  
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorAdd);
        errorElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";

    }

    // Проверка валидности формы   
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Проверка валидности всех полей формы
    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid
        })
    }

    // Изменение состояния кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    // Добавим обаботчики всем полям формы
    _setEventListeners() {
        // здесь были this._inputList и this._buttonElement перенесенные в constructor
        
        // чтобы проверить состояние кнопки в самом начале
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            // чтобы проверять состояние кнопки при изменении любого из полей
            this._toggleButtonState();
          });
        });
      };



    // Сброс валидации
    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        })
    }

    // Включение валидации
    enableValidation() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        this._setEventListeners()
    }
}