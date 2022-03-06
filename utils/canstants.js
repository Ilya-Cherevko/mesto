const PROFILE = {
    NAME: document.querySelector('.profile__name'),
    ABOUT: document.querySelector('.profile__about'),
}

const FORMS = {
    EDIT: document.forms.edit,
    ADD: document.forms.add,
}

const POPUPS = {
    ALL: document.querySelectorAll('.popup'),
    CLOSE_SELECTOR: 'popup__close',
    EDIT: {
        POPUP: document.querySelector('.popup_edit'),
        OPEN: document.querySelector('.profile__edit-button'),
        NAME: FORMS.EDIT.elements.name,
        ABOUT: FORMS.EDIT.elements.about,
        SUBMIT_BTN: FORMS.EDIT.querySelector('.popup__submit'),
    },
    ADD: {
        POPUP: document.querySelector('.popup_add'),
        OPEN: document.querySelector('.profile__add-button'),
        TITLE: FORMS.ADD.elements.title,
        LINK: FORMS.ADD.elements.link,
        SUBMIT_BTN: FORMS.ADD.querySelector('.popup__submit'),
    },
    IMAGE: {
        POPUP: document.querySelector('.popup_image'),
        IMAGE: document.querySelector('.popup__big-img'),
        CAPTION: document.querySelector('.popup__title-img'),
    },
}

const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const elements = document.querySelector('.elements');

const formValidators = {}

export { PROFILE, FORMS, POPUPS, configForm, elements, formValidators }