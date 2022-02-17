const showInputError = (formElement, inputElement, errorMessage, config) => {
  console.log(config.inputErrorAdd);
  console.log(config. inputErrorClass);
  console.log(errorMessage);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add(config.inputErrorAdd);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  console.log(config.inputErrorAdd);
  console.log(config. inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorAdd);
  errorElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  console.log(config);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  console.log(config.inputSelector);
  console.log(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  console.log(config.formSelector);
  console.log(config.fieldsetList);
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetList));
  fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet, config);
}); 
    
  });
};

//enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

function toggleButtonState(inputList, buttonElement, config) {
  console.log(config.inactiveButtonClass);
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(config.inactiveButtonClass);
} else {
  buttonElement.classList.remove(config.inactiveButtonClass);
} 
}

enableValidation({
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  fieldsetList: '.popup__form-fieldset',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error_active',
  inputErrorAdd: 'popup__input-error_border-red',
});